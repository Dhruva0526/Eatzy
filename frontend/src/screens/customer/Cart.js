import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getCartAPI,
  updateCartAPI,
  deleteCartAPI
} from "../../services/cartService";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cart({ navigation }) {
  const [cartItems, setCartItems] = useState([]);

  const USER_ID = "56839ba5-2e0c-48ac-bf1a-c691c4e8b2b1";

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {

    try {

      const res = await getCartAPI(USER_ID);

      setCartItems(res);

    } catch (error) {

      console.log("CART ERROR:", error);
    }
  };


  const increaseQty = async (cartId, currentQty) => {

    try {

      await updateCartAPI(
        cartId,
        currentQty + 1
      );

      loadCart();

    } catch (error) {

      console.log(error);
    }
  };


  const decreaseQty = async (cartId, currentQty) => {

    try {

      if (currentQty <= 1) {

        await deleteCartAPI(cartId);

      } else {

        await updateCartAPI(
          cartId,
          currentQty - 1
        );
      }

      loadCart();

    } catch (error) {

      console.log(error);
    }
  };


  const removeFromCart = async (cartId) => {

    try {

      await deleteCartAPI(cartId);

      loadCart();

    } catch (error) {

      console.log(error);
    }
  };


  const getTotal = () => {

    return cartItems.reduce((total, item) => {

      return total + (
        item.menu_item.price * item.quantity
      );

    }, 0);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Your Cart</Text>

      {/* CART LIST */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.cart_id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Cart is empty 😢
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            {/* ITEM INFO */}
            <View>
              <Text style={styles.name}>{item.menu_item.name}</Text>
              <Text style={styles.price}>₹{item.menu_item.price}</Text>
            </View>

            {/* QTY CONTROLS */}
            <View style={styles.qtyBox}>
              <TouchableOpacity onPress={() => decreaseQty(
                item.cart_id,
                item.quantity
              )}>
                <Text style={styles.btn}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qty}>{item.quantity}</Text>

              <TouchableOpacity onPress={() => increaseQty(
                item.cart_id,
                item.quantity
              )}>
                <Text style={styles.btn}>＋</Text>
              </TouchableOpacity>
            </View>

            {/* REMOVE */}
            <TouchableOpacity onPress={() => removeFromCart(item.cart_id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* TOTAL + CHECKOUT */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ₹{getTotal()}</Text>

          <TouchableOpacity 
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    color: "#777",
    marginBottom: 8,
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  btn: {
    fontSize: 22,
    paddingHorizontal: 10,
    color: "#FF7643",
  },

  qty: {
    fontSize: 18,
    marginHorizontal: 10,
  },

  remove: {
    color: "red",
    marginTop: 5,
  },

  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },

  total: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  checkoutBtn: {
    backgroundColor: "#FF7643",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});