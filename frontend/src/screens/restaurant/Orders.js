import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  getActiveOrdersAPI,
  updateOrderStatusAPI
} from "../../services/restaurantOrderService";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Orders() {
  const navigation = useNavigation();
  const [activeOrders, setActiveOrders] = useState([]);

  const TOTAL_CHEFS = 1;

  useEffect(() => {

    loadOrders();

    const interval = setInterval(() => {

      loadOrders();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const loadOrders = async () => {

    try {

      const restaurantId = await AsyncStorage.getItem(
        "restaurant_id"
      );

      console.log("RESTAURANT ID:", restaurantId);

      const res = await getActiveOrdersAPI(
        restaurantId
      );

      console.log(
        "RESTAURANT ORDERS:",
        JSON.stringify(res, null, 2)
      );

      setActiveOrders(res);

    } catch (error) {

      console.log(error);

    }
  };


  const updateStatus = async (
    orderId,
    status
  ) => {

    try {

      await updateOrderStatusAPI(
        orderId,
        status
      );

      loadOrders();

    } catch (error) {

      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
      const getStatusColor = () => {

        switch (item.status) {

          case "pending":
            return "#F59E0B";

          case "preparing":
            return "#8B5CF6";

          case "completed":
            return "#10B981";

          case "rejected":
            return "#EF4444";

          default:
            return "#777";
        }
      };

    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>

          <View>
            <Text style={styles.orderId}>
              #{item.order_id}
            </Text>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    getStatusColor()
                }
              ]}
            >
              <Text style={styles.statusText}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.time}>
            {new Date(
              item.created_at
            ).toLocaleTimeString()}
          </Text>

        </View>

        <Text style={styles.items}>{
          item.items.map(i =>
            `${i.qty}x ${i.name}`
          ).join(", ")
        }</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.price}>
            ₹{item.total}
          </Text>

          <View style={{ flexDirection: "row" }}>

            {item.status === "preparing" && (
              <TouchableOpacity
                style={styles.completeBtn}
                onPress={() =>
                  updateStatus(
                    item.order_id,
                    "completed"
                  )
                }
              >
                <Text style={styles.completeText}>
                  Complete
                </Text>
              </TouchableOpacity>
            )}


            {(item.status === "completed" ||
              item.status === "rejected") && (

              <Text
                style={{
                  color: getStatusColor(),
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {item.status.toUpperCase()}
              </Text>
            )}

          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Active Orders</Text>
          <Text style={styles.headerSub}>
            Chefs: {
              activeOrders.filter(
                (o) => o.status === "preparing"
              ).length
            }/{TOTAL_CHEFS}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications-outline" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Orders */}
      <FlatList
        data={activeOrders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No Active Orders</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

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

  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6A3D',
  },

  time: {
    color: '#888',
  },

  items: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '600',
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  completeBtn: {
    backgroundColor: '#DFF6E7',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
  },

  completeText: {
    color: '#1DBF73',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
    fontSize: 16,
  },

  statusBadge: {
  marginTop: 6,
  alignSelf: "flex-start",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
},

statusText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 12,
},
});
