import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

export default function OrderDetails() {
  const route = useRoute();
  const order = route.params?.order;

  const subtotal = order?.total || 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const finalTotal = subtotal + tax;

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <Text style={styles.title}>Order Details</Text>

      <View style={styles.topCard}>

        <Text style={styles.orderId}>
          Order #{order?.order_id}
        </Text>

        <Text style={styles.date}>
          {new Date(order?.created_at).toLocaleString()}
        </Text>

        <View
          style={[
            styles.statusBadge,

            {
              backgroundColor:
                order?.status === "completed"
                  ? "#DFF6E7"
                  : order?.status === "preparing"
                  ? "#DBEAFE"
                  : "#FEF3C7"
            }
          ]}
        >
          <Text
            style={[
              styles.statusText,

              {
                color:
                  order?.status === "completed"
                    ? "#16A34A"
                    : order?.status === "preparing"
                    ? "#2563EB"
                    : "#D97706"
              }
            ]}
          >
            {order?.status?.toUpperCase()}
          </Text>
        </View>

      </View>

      {/* ITEMS */}
      <FlatList
        data={order?.items}
        keyExtractor={(item, index) =>
          index.toString()
        }

        contentContainerStyle={{
          paddingTop: 20
        }}

        renderItem={({ item }) => (

          <View style={styles.itemCard}>

            <View>
              <Text style={styles.itemName}>
                {item.name}
              </Text>

              <Text style={styles.qty}>
                Qty: {item.qty}
              </Text>
            </View>

            <Text style={styles.itemPrice}>
              ₹{item.price * item.qty}
            </Text>

          </View>
        )}
      />

      {/* BILL SUMMARY */}
      <View style={styles.billBox}>

        <Text style={styles.summaryTitle}>
          Payment Summary
        </Text>

        <View style={styles.row}>
          <Text>Subtotal</Text>
          <Text>₹{subtotal}</Text>
        </View>

        <View style={styles.row}>
          <Text>GST (5%)</Text>
          <Text>₹{tax}</Text>
        </View>

        <View style={styles.row}>
          <Text>Delivery Fee</Text>
          <Text>₹40</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalText}>
            Grand Total
          </Text>

          <Text style={styles.totalText}>
            ₹{finalTotal + 40}
          </Text>
        </View>

      </View>

    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },

  orderId: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  itemName: {
    fontSize: 16,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
  },

  billBox: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "700",
  },


  topCard: {
    backgroundColor: "#fff7f4",
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },

  date: {
    color: "#777",
    marginTop: 8,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 14,
  },

  statusText: {
    fontWeight: "700",
    fontSize: 13,
  },

  itemCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qty: {
    color: "#777",
    marginTop: 5,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },


});