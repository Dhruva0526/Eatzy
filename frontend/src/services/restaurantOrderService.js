import API from "./api";

// GET RESTAURANT ORDERS
export const getRestaurantOrdersAPI = async (restaurantId) => {

  console.log("RESTAURANT ID:", restaurantId);
  const res = await API.get(
    `/restaurant/orders/${restaurantId}`
  );

  return res.data;
};


// UPDATE STATUS
export const updateOrderStatusAPI = async (
  orderId,
  status
) => {

  const res = await API.put(
    `/restaurant/orders/${orderId}/status?status=${status}`
  );

  return res.data;
};

// GET PENDING ORDERS
export const getPendingOrdersAPI = async (
  restaurantId
) => {

  const res = await API.get(
    `/orders/restaurant/${restaurantId}/pending`
  );

  return res.data;
};


// GET QUEUE ORDERS
export const getQueueOrdersAPI = async (
  restaurantId
) => {

  const res = await API.get(
    `/orders/restaurant/${restaurantId}/queue`
  );

  return res.data;
};


// GET ACTIVE ORDERS
export const getActiveOrdersAPI = async (
  restaurantId
) => {

  const res = await API.get(
    `/orders/restaurant/${restaurantId}/active`
  );

  return res.data;
};

// GET COMPLETED ORDERS
export const getCompletedOrdersAPI = async (
  restaurantId
) => {

  const res = await API.get(
    `/orders/restaurant/${restaurantId}/completed`
  );

  return res.data;
};

// GET ANALYTICS
export const getRestaurantAnalyticsAPI = async (
  restaurantId
) => {

  const res = await API.get(
    `/orders/restaurant/${restaurantId}/analytics`
  );

  return res.data;
};