import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getPendingOrdersAPI,
  updateOrderStatusAPI
} from "../../services/restaurantOrderService";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ReservationContext } from '../../context/ReservationContext';

const ORANGE = '#FF6A3D';
const GREEN = '#2ECC71';
const RED = '#FF4D4D';

export default function Notification({ navigation }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [newOrders, setNewOrders] = useState([]);

  useEffect(() => {

    loadOrders();

    const interval = setInterval(() => {

      loadOrders();

    }, 3000);

    return () => clearInterval(interval);

  }, []);
  const {
    pendingReservations,
    acceptReservation,
    rejectReservation,
  } = useContext(ReservationContext);

  const loadOrders = async () => {

    try {

      const restaurantId =
        await AsyncStorage.getItem(
          "restaurant_id"
        );

      const res =
        await getPendingOrdersAPI(
          restaurantId
        );

      setNewOrders(res);

    } catch (error) {

      console.log(error);

    }
  };
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 26 }} />
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
            New Orders
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
            New Reservations
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'orders' &&
          newOrders?.map((order, index) => (
            <View key={order.order_id.toString()} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.orderId}>
                  #{order.order_id}
                </Text>
                <Text style={styles.time}>
                  {new Date(
                    order.created_at
                  ).toLocaleTimeString()}
                </Text>
              </View>

              <Text style={styles.items}>
                {order.items
                  ?.map(
                    (i) => `${i.qty}x ${i.name}`
                  )
                  .join(", ")}
              </Text>
              <Text style={styles.price}>
                ₹{order.total}
              </Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={async () => {

                    await updateOrderStatusAPI(
                      order.order_id,
                      "rejected"
                    );

                    loadOrders();
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

                    loadOrders();
                  }}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
        ))}


          {activeTab === 'reservations' &&
           pendingReservations?.map((res, index) => (
            <View key={res.id.toString()} style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.orderId}>{res.id}</Text>
                <Text style={styles.time}>{res.time}</Text>
              </View>

              <Text style={styles.items}>{res.name}</Text>
              <Text style={styles.subInfo}>{res.guests}</Text>
              <Text style={styles.subInfo}>{res.datetime}</Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => rejectReservation(res.id)}
                >
                  <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => acceptReservation(res)}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
        ))}


          
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 12,
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

  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
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
