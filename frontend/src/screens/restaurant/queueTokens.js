import React, {
  useEffect,
  useState
} from 'react';
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getQueueOrdersAPI,
  getActiveOrdersAPI,
  updateOrderStatusAPI
} from "../../services/restaurantOrderService";

const ORANGE = '#FF6A3D';
const RED = '#FF4D4D';

export default function QueueTokens() {
  const navigation = useNavigation();

  const [queueOrders, setQueueOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);

  const TOTAL_CHEFS = 1;

  const availableChefs =
    TOTAL_CHEFS - activeOrders.length;

  useEffect(() => {

    loadData();

    const interval = setInterval(() => {

      loadData();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const loadData = async () => {

    try {

      const restaurantId =
        await AsyncStorage.getItem(
          "restaurant_id"
        );

      // queue orders
      const queueRes =
        await getQueueOrdersAPI(
          restaurantId
        );

      // active kitchen orders
      const activeRes =
        await getActiveOrdersAPI(
          restaurantId
        );

      setQueueOrders(queueRes);
      setActiveOrders(activeRes);

    } catch (error) {

      console.log(error);

    }
  };

  const renderItem = ({ item, index }) => {
    const willPrepare = index < availableChefs;

    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.orderId}>
            #{item.order_id}
          </Text>
          <Text style={styles.time}>
            {new Date(
              item.created_at
            ).toLocaleTimeString()}
          </Text>
        </View>

        <Text style={styles.items}>
          {item.items
            ?.map(
              (i) => `${i.qty}x ${i.name}`
            )
            .join(", ")}
        </Text>
        <Text style={styles.price}>
          ₹{item.total}
        </Text>

        <View style={styles.rowBetween}>
          {willPrepare ? (
            <View style={styles.prepareBadge}>
              <Ionicons name="flame" size={16} color="#fff" />
              <Text style={styles.prepareText}>Preparing</Text>
            </View>
          ) : (
            <Text style={styles.waitingText}>Waiting in Queue</Text>
          )}

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={async () => {

              await updateOrderStatusAPI(
                item.order_id,
                "rejected"
              );

              loadData();
            }}
          >
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Queue Tokens</Text>
          <Text style={styles.subtitle}>
            Available Chefs: {availableChefs}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Queue Orders */}
      <FlatList
        data={queueOrders}
        keyExtractor={(item) =>
          item.order_id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No orders in queue 🍕
          </Text>
        }
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

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

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
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
    color: ORANGE,
  },

  time: {
    color: '#888',
  },

  items: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  prepareBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ORANGE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  prepareText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },

  waitingText: {
    color: '#777',
    fontWeight: '600',
  },

  cancelBtn: {
    backgroundColor: '#FFD6D6',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  cancelText: {
    color: RED,
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 80,
    color: '#777',
    fontSize: 16,
  },
});
