import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getCartAPI,
  addToCartAPI,
  updateCartAPI,
  deleteCartAPI
} from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);

  const USER_ID =
  "56839ba5-2e0c-48ac-bf1a-c691c4e8b2b1";

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {

    try {

      const data = await getCartAPI(USER_ID);

      const formatted = data.map(i => ({
        cart_id: i.cart_id,
        id: i.menu_item.id,
        restaurant_id: i.menu_item.restaurant_id,
        name: i.menu_item.name,
        price: i.menu_item.price,
        description: i.menu_item.description,
        qty: i.quantity,
      }));

      setCartItems(formatted);

      if (formatted.length > 0) {
        setRestaurantId(
          formatted[0].restaurant_id
        );
      }

    } catch (error) {

      console.log(
        "LOAD BACKEND CART ERROR:",
        error
      );
    }
  };

  const saveCart = async (items) => {
    try {

      await AsyncStorage.setItem(
        "cart",
        JSON.stringify(items)
      );

    } catch (error) {
      console.log("SAVE CART ERROR:", error);
    }
  };

  /* ADD ITEM */
  const addToCart = async (item) => {

    if (
      restaurantId &&
      restaurantId !== item.restaurant_id
    ) {
      return {
        error: true,
        message: "Different restaurant"
      };
    }

    let updatedCart = [];

    const existing = cartItems.find(
      i => i.id === item.id
    );

    // EXISTING ITEM
    if (existing) {

      const newQty = existing.qty + 1;

      await updateCartAPI(
        existing.cart_id,
        newQty
      );

      updatedCart = cartItems.map(i =>
        i.id === item.id
          ? { ...i, qty: newQty }
          : i
      );

    } else {

      // ADD NEW ITEM
      const res = await addToCartAPI({
        user_id: USER_ID,
        menu_item_id: item.id,
        quantity: 1,
      });

      updatedCart = [
        ...cartItems,
        {
          ...item,
          qty: 1,

          // IMPORTANT
          cart_id:
            res?.cart_id ||
            res?.id ||
            res?.data?.cart_id
        }
      ];
    }

    if (!restaurantId) {
      setRestaurantId(item.restaurant_id);
    }

    setCartItems(updatedCart);

    await saveCart(updatedCart);
  };

  /* REMOVE ITEM */
  const removeFromCart = async (id) => {

    const updatedCart = cartItems.filter(
      i => i.id !== id
    );

    if (updatedCart.length === 0) {
      setRestaurantId(null);
    }

    setCartItems(updatedCart);

    await saveCart(updatedCart);
  };

  /* INCREASE */
  const increaseQty = async (id) => {

    try {

      console.log("INCREASE ID:", id);

      const item = cartItems.find(
        i => i.id === id
      );

      console.log("FOUND ITEM:", item);

      if (!item) return;

      const newQty = item.qty + 1;

      console.log("NEW QTY:", newQty);

      const res = await updateCartAPI(
        item.cart_id,
        newQty
      );

      console.log("UPDATE RESPONSE:", res);

      const updatedCart = cartItems.map(i =>
        i.id === id
          ? { ...i, qty: newQty }
          : i
      );

      setCartItems(updatedCart);

      await saveCart(updatedCart);

    } catch (error) {

      console.log(
        "INCREASE ERROR:",
        error?.response?.data || error
      );
    }
  };

  /* DECREASE */
  const decreaseQty = async (id) => {

  const item = cartItems.find(
    i => i.id === id
  );

  if (!item) return;

  if (item.qty === 1) {

    await deleteCartAPI(item.cart_id);

      const updatedCart = cartItems.filter(
        i => i.id !== id
      );

      setCartItems(updatedCart);

      await saveCart(updatedCart);

      if (updatedCart.length === 0) {
        setRestaurantId(null);
      }

      return;
    }

    const newQty = item.qty - 1;

    await updateCartAPI(
      item.cart_id,
      newQty
    );

    const updatedCart = cartItems.map(i =>
      i.id === id
        ? { ...i, qty: newQty }
        : i
    );

    setCartItems(updatedCart);

    await saveCart(updatedCart);
  };

  /* TOTAL */
  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  };

  const placeOrder = async () => {

    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      total: getTotal(),
      date: new Date().toLocaleString(),
      status: "Preparing",
    };

    setOrders(prev => [newOrder, ...prev]);

    setCartItems([]);

    setRestaurantId(null);

    await AsyncStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        getTotal,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};