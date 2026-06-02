import API from "./api";

export const placeOrderAPI = async (data) => {

  const res = await API.post(
    "/orders/create",
    data
  );

  return res.data;
};


// GET USER ORDERS
export const getUserOrdersAPI = async (userId) => {
  const res = await API.get(`/orders/user/${userId}`);
  return res.data;
};


// GET SINGLE ORDER
export const getSingleOrderAPI = async (
  orderId
) => {

  const res = await API.get(
    `/orders/${orderId}`
  );

  return res.data;
};


// UPDATE ORDER STATUS
export const updateOrderStatusAPI = async (
  orderId,
  status
) => {

  const res = await API.put(
    `/orders/${orderId}/status?status=${status}`
  );

  return res.data;
};


// GET RESTAURANT ORDERS
export const getRestaurantOrdersAPI = async (
  restaurantId
) => {

  const res = await API.get(
    `/orders/restaurant/${restaurantId}`
  );

  return res.data;
};