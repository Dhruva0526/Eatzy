import React, { useContext } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { CartContext } from "../../context/CartContext";

export default function FloatingCartBar() {

  const navigation = useNavigation();

  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  if (totalItems === 0) return null;

  return (
    <View style={styles.cartBar}>

      <View>

        <Text style={styles.cartItemsText}>
          {totalItems} Items Added
        </Text>

        <Text style={styles.cartPriceText}>
          ₹{totalPrice}
        </Text>

      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.viewCartText}>
          View Cart →
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  cartBar: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "#FF7643",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },

  cartItemsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  cartPriceText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 3,
  },

  viewCartText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});