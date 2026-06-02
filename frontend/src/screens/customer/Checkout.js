import React, {
  useState,
  useContext
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { CartContext } from "../../context/CartContext";

import { placeOrderAPI } from "../../services/orderService";

export default function Checkout({ navigation }) {

  const USER_ID =
    "56839ba5-2e0c-48ac-bf1a-c691c4e8b2b1";

  const { cartItems } =
    useContext(CartContext);

  const [loading, setLoading] =
    useState(false);

  /* TOTAL PRICE */
  const totalPrice = cartItems.reduce(
    (total, item) => {
      return total + (
        item.price * item.qty
      );
    },
    0
  );

  /* PLACE ORDER */
  const handlePlaceOrder = async () => {

    try {

      if (!cartItems.length) {
        console.log("Cart Empty");
        return;
      }

      setLoading(true);

      const payload = {

        user_id: USER_ID,

        restaurant_id:
          cartItems[0]?.restaurant_id,

        items: cartItems.map(item => ({
          menu_item_id: item.id,
          quantity: item.qty
        }))
      };

      console.log(
        "ORDER PAYLOAD:",
        payload
      );

      const res =
        await placeOrderAPI(payload);

      console.log(
        "ORDER RESPONSE:",
        res
      );

      navigation.navigate(
        "OrderStatus",
        {
          orderData: {
            order_id: res.order_id
          }
        }
      );

    } catch (error) {

      console.log(
        "ORDER ERROR:",
        error?.response?.data || error
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <SafeAreaView
      style={styles.safe}
      edges={["top", "bottom"]}
    >

      <View style={styles.container}>

        {/* TITLE */}
        <Text style={styles.title}>
          Checkout
        </Text>

        {/* CART ITEMS */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20
          }}
        >

          {
            cartItems.length === 0 ? (

              <View style={styles.emptyContainer}>

                <Text style={styles.emptyText}>
                  Your cart is empty
                </Text>

              </View>

            ) : (

              cartItems.map((item) => (

                <View
                  key={item.id}
                  style={styles.itemCard}
                >

                  <View>

                    <Text style={styles.itemName}>
                      {item.name}
                    </Text>

                    <Text style={styles.itemQty}>
                      Qty: {item.qty}
                    </Text>

                  </View>

                  <Text style={styles.itemPrice}>
                    ₹{item.price * item.qty}
                  </Text>

                </View>

              ))
            )
          }

        </ScrollView>

        {/* TOTAL */}
        <View style={styles.totalBox}>

          <Text style={styles.totalText}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ₹{totalPrice}
          </Text>

        </View>

        {/* PLACE ORDER BUTTON */}
        <TouchableOpacity
          style={[
            styles.btn,
            cartItems.length === 0 && {
              opacity: 0.5
            }
          ]}
          disabled={
            cartItems.length === 0 ||
            loading
          }
          onPress={handlePlaceOrder}
        >

          <Text style={styles.btnText}>
            {
              loading
                ? "Placing Order..."
                : "Place Order"
            }
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111",
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "gray",
  },

  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  itemName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },

  itemQty: {
    fontSize: 15,
    color: "gray",
    marginTop: 4,
  },

  itemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF7643",
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  totalText: {
    fontSize: 22,
    fontWeight: "700",
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF7643",
  },

  btn: {
    backgroundColor: "#FF7643",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});