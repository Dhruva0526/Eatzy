import API from "./api";

// GET SETTINGS
export const getSettings = async (restaurantId) => {
  try {
    const res = await API.get(`/settings/${restaurantId}`);
    return res.data;
  } catch (err) {
    console.log("GET SETTINGS ERROR:", err.response?.data || err.message);
    throw err;
  }
};

// UPDATE SETTINGS
export const updateSettings = async (restaurantId, payload) => {
  try {
    const res = await API.put(`/settings/${restaurantId}`, payload);
    return res.data;
  } catch (err) {
    console.log("UPDATE SETTINGS ERROR:", err.response?.data || err.message);
    throw err;
  }
};