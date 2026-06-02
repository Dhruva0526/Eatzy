import API from "./api";

// 🔹 Get profile
export const getProfile = () => {
  return API.get("/users/me");
};

// 🔹 Update profile
export const updateProfile = (data) => {
  return API.put("/users/me", data);
};