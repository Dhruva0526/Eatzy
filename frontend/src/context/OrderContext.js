import React, { createContext, useEffect, useState } from 'react';
import { 
  getPendingOrdersAPI, 
  getActiveOrdersAPI, 
  getQueueOrdersAPI,
  updateOrderStatusAPI,
  getRestaurantOrdersAPI
} from '../services/restaurantOrderService';
import API from '../services/api'; // Used for fetching dynamic chef status

// Creating Order Context with default structures matching the backend data
export const OrderContext = createContext({
  newOrders: [],
  queueOrders: [],
  activeOrders: [],
  completedOrders: [],
  todaySalesAmount: 0,
  acceptOrder: () => {},
  rejectOrder: () => {},
  completeOrder: () => {},
  loading: false,
  TOTAL_CHEFS: 1,
  availableChefs: 1
});

export const OrderProvider = ({ children }) => {
  const [newOrders, setNewOrders] = useState([]);
  const [queueOrders, setQueueOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [todaySalesAmount, setTodaySalesAmount] = useState(0);
  const [chefStatus, setChefStatus] = useState({ total_chefs: 1, available_chefs: 1 });
  const [loading, setLoading] = useState(false);

  // Define Restaurant ID (Can be made dynamic based on logged-in user session)
  const restaurantId = 1; 

  /* ---------------- 🔄 BACKEND SYNC ENGINE (POLLED EVERY 3s) ---------------- */
  const fetchAndSyncData = async () => {
    if (!restaurantId) return;
    try {
      // Fetch data from all backend endpoints concurrently using Promise.all
      const [pending, active, queue, chefRes, allOrders] = await Promise.all([
        getPendingOrdersAPI(restaurantId),
        getActiveOrdersAPI(restaurantId),
        getQueueOrdersAPI(restaurantId),
        API.get(`/orders/restaurant/${restaurantId}/chef-status`).then(res => res.data).catch(() => ({ total_chefs: 1, available_chefs: 1 })),
        getRestaurantOrdersAPI(restaurantId).catch(() => [])
      ]);

      // Sync local state variables with database records
      setNewOrders(pending || []);
      setActiveOrders(active || []);
      setQueueOrders(queue || []);
      setChefStatus(chefRes);

      // Filter only completed orders to compute total daily sales
      const completed = allOrders.filter(o => o.status.toLowerCase() === 'completed');
      setCompletedOrders(completed);

      // Calculate total revenue from floating-point backend totals
      const totalSales = completed.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);
      setTodaySalesAmount(totalSales);

    } catch (error) {
      console.error("Error syncing context with backend:", error);
    }
  };

  // Setup global polling mechanism to trigger data sync every 3 seconds
  useEffect(() => {
    fetchAndSyncData(); // Initial immediate fetch on load
    
    const interval = setInterval(() => {
      fetchAndSyncData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  /* ---------------- ⚡ LIVE BACKEND-CONNECTED ACTIONS ---------------- */

  // 1. ACCEPT ORDER: Moves order status from 'pending' to 'accepted'
  // Backend automatically checks chef availability to shift it from queue to 'preparing'
  const acceptOrder = async (orderId) => {
    try {
      setLoading(true);
      await updateOrderStatusAPI(orderId, 'accepted');
      await fetchAndSyncData(); // Immediate data refresh after status change
    } catch (error) {
      console.error("Failed to accept order:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. REJECT ORDER: Terminates order directly from notifications screen
  const rejectOrder = async (orderId) => {
    try {
      setLoading(true);
      await updateOrderStatusAPI(orderId, 'rejected');
      await fetchAndSyncData();
    } catch (error) {
      console.error("Failed to reject order:", order);
    } finally {
      setLoading(false);
    }
  };

  // 3. COMPLETE ORDER: Marks an active kitchen order as 'completed'
  // Triggering this automatically makes room for upcoming orders sitting in the FIFO queue
  const completeOrder = async (orderId) => {
    try {
      setLoading(true);
      await updateOrderStatusAPI(orderId, 'completed');
      await fetchAndSyncData();
    } catch (error) {
      console.error("Failed to complete order:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <OrderContext.Provider
      value={{
        newOrders,       // Synced with /pending
        queueOrders,     // Synced with /queue
        activeOrders,    // Synced with /active
        completedOrders, // Filtered history list
        todaySalesAmount,
        acceptOrder,     // API integrated trigger function
        rejectOrder,     // API integrated trigger function
        completeOrder,   // API integrated trigger function
        loading,
        TOTAL_CHEFS: chefStatus.total_chefs,
        availableChefs: chefStatus.available_chefs
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};