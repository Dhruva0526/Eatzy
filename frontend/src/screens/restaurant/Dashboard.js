import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import StatCard from '../../components/restaurant/StatCard';
import { ReservationContext } from '../../context/ReservationContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../../services/profileService";

import {
  getPendingOrdersAPI,
  getQueueOrdersAPI,
  getActiveOrdersAPI,
  getCompletedOrdersAPI,
  updateOrderStatusAPI
} from "../../services/restaurantOrderService";

import {
  getRestaurantReservations,
  updateReservationStatus
} from "../../services/reservationService";

export default function RestaurantDashboard() {
  const navigation = useNavigation();
  const [restaurantName, setRestaurantName] = useState("");
  const [activeTab, setActiveTab] = useState('orders');
  const [newOrders, setNewOrders] = useState([]);
  const [queueOrders, setQueueOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [todaySalesAmount, setTodaySalesAmount] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [pendingReservations, setPendingReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);

  useEffect(() => {

    loadDashboardData();

    const interval = setInterval(() => {

        loadDashboardData();

    }, 3000);

    return () => clearInterval(interval);

  }, []);


  const loadDashboardData = async () => {

    try {

        const restaurantId =
        await AsyncStorage.getItem(
            "restaurant_id"
        );

        const identifier =
            await AsyncStorage.getItem(
                "identifier"
            );

            if (identifier) {

            const profileData =
                await getProfile(identifier);

            setRestaurantName(
                profileData.shopName || "Restaurant"
            );
        }
        const pendingRes =
        await getPendingOrdersAPI(
            restaurantId
        );

        const queueRes =
        await getQueueOrdersAPI(
            restaurantId
        );

        const activeRes =
        await getActiveOrdersAPI(
            restaurantId
        );

        const completedRes =
        await getCompletedOrdersAPI(
            restaurantId
        );

        const reservationRes =
        await getRestaurantReservations(
            restaurantId
        );

        setReservations(reservationRes);

        setPendingReservations(
            reservationRes.filter(
                (r) => r.status === "pending"
            )
        );

        setConfirmedReservations(
          reservationRes.filter(
            (r) =>
              r.status === "confirmed"
          )
        );

        setNewOrders(pendingRes);
        setQueueOrders(queueRes);
        setActiveOrders(activeRes);

        const totalSales = completedRes.reduce(
        (sum, order) => sum + Number(order.total),
        0
        );

        setTodaySalesAmount(totalSales);

    } catch (error) {

        console.log(error);

    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSub}>
              {restaurantName || "Restaurant"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')} >
            <Ionicons name="notifications-outline" size={24} color="#777" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stats Cards */}
          <View style={styles.cardRow}>
            <StatCard
              icon={<MaterialIcons name="receipt-long" size={28} color="#2563eb" />}
              value={activeOrders.length}
              label="Active Orders"
              bg="#e0e7ff"
              onPress={() => navigation.navigate('Orders')}
            />
            <StatCard
              icon={<MaterialIcons name="event-available" size={28} color="#9333ea" />}
              value={confirmedReservations.length}
              label="Reservations"
              bg="#f3e8ff"
              onPress={() => navigation.navigate('Reservations')}
            />
          </View>

          <View style={styles.cardRow}>
            <StatCard
              icon={<FontAwesome5 name="ticket-alt" size={26} color="#ca8a04" />}
              value={queueOrders.length}
              label="Queue Tokens"
              bg="#fef9c3"
              onPress={() => navigation.navigate('QueueTokens')}
            />
            <StatCard
              icon={<FontAwesome5 name="rupee-sign" size={26} color="#16a34a" />}
              value={`₹${todaySalesAmount.toFixed(2)}`}
              // value={todaySalesAmount === 0 ? '$0.00' : `$${todaySalesAmount.toFixed(2)}`}
              label="Today's Sales"
              bg="#dcfce7"
              onPress={() => navigation.navigate('TodaySales')}
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'orders' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('orders')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'orders' && styles.activeText,
                ]}
              >
                Orders
              </Text>
            </TouchableOpacity>
          
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'reservations' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('reservations')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'reservations' && styles.activeText,
                ]}
              >
                Reservations
              </Text>
            </TouchableOpacity>
          </View>

          {/* Orders */}
          {activeTab === 'orders' && (
            <View style={styles.listContainer}>
              <Text style={styles.sectionTitle}>New Orders</Text>
              {newOrders?.map((order, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.orderId}>#{order.order_id}</Text>
                    <Text style={styles.time}>{new Date(order.created_at).toLocaleTimeString()}</Text>
                  </View>

                  <Text style={styles.items}>{
                    order.items
                        ?.map((i) => `${i.qty}x ${i.name}`)
                        .join(", ")
                  }</Text>
                  <Text style={styles.price}>₹{order.total}</Text>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={async () => {

                        await updateOrderStatusAPI(
                            order.order_id,
                            "rejected"
                        );

                        loadDashboardData();
                      }}
                    >
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={async () => {

                        await updateOrderStatusAPI(
                            order.order_id,
                            "accepted"
                        );

                        loadDashboardData();
                      }}
                    >
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Reservations */}
          {activeTab === 'reservations' && (
            <View style={styles.listContainer}>
              <Text style={styles.sectionTitle}>New Reservations</Text>
              {pendingReservations?.map((res, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.orderId}>
                      #RES-{res.id}
                    </Text>
                    <Text style={styles.time}>
                      {res.booking_time}
                    </Text>
                  </View>
                        
                  <Text style={styles.items}>
                    {res.customer_name}
                  </Text>

                  <Text style={styles.subInfo}>
                    {res.people_count} Guests
                  </Text>

                  <Text style={styles.subInfo}>
                    {res.booking_date} • {res.booking_time}
                  </Text>
            
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={async () => {

                        await updateReservationStatus(
                          res.id,
                          "rejected"
                        );

                        loadDashboardData();
                      }}
                    >
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={async () => {

                        await updateReservationStatus(
                          res.id,
                          "accepted"
                        );

                        loadDashboardData();
                      }}
                    >
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const ORANGE = '#FF6A3D';
const GREEN = '#2ECC71';
const RED = '#FF4D4D';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
  },
  headerSub: {
    color: '#777',
    fontSize: 14,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 14,
    padding: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: ORANGE,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  activeText: {
    color: '#fff',
  },

  sectionTitle: {
    fontSize: 22, 
    fontWeight: '700',  
    marginBottom: 10, 
  },
  listContainer: {
    width: '100%',        // ✅ forces full width
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: ORANGE,
  },
  time: {
    color: '#777',
  },

  items: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 6,
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  rejectBtn: {
    backgroundColor: '#FFD6D6',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginRight: 12,
  },
  rejectText: {
    color: RED,
    fontWeight: '700',
    fontSize: 16,
  },

  acceptBtn: {
    backgroundColor: '#DFF6EA',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
  },
  acceptText: {
    color: GREEN,
    fontWeight: '700',
    fontSize: 16,
  },

  subInfo: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },

});
