import API from "./api";


// ADD TO CART
export const addToCartAPI = async (data) => {
  const res = await API.post("/cart", data);
  return res.data;
};

// GET USER CART
export const getCartAPI = async (userId) => {
  const res = await API.get(`/cart/${userId}`);
  return res.data;
};

// UPDATE QUANTITY
export const updateCartAPI = async (cartId, quantity) => {
  const res = await API.put(
    `/cart/${cartId}?quantity=${quantity}`
  );

  return res.data;
};

// DELETE ITEM
export const deleteCartAPI = async (cartId) => {
  const res = await API.delete(`/cart/${cartId}`);
  return res.data;
};