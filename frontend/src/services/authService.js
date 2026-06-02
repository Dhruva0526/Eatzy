import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "./api";

// =========================
// TOKEN HANDLING (Optimized)
// =========================
let authToken = null;

// 🔹 Set token in memory
export const setToken = async (token) => {
  authToken = token;
  await AsyncStorage.setItem("token", token);
};

// 🔹 Clear token (logout)
export const clearToken = async () => {
  authToken = null;
  await AsyncStorage.removeItem("token");
};


// =========================
// REQUEST INTERCEPTOR
// =========================
API.interceptors.request.use(
  async (config) => {

    // 🔥 Always get fresh token
    const token = await AsyncStorage.getItem("token");

    console.log("TOKEN BEING SENT:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("TOKEN SENT:", token);
    } else {
      console.log("NO TOKEN (public API)");
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// =========================
// RESPONSE INTERCEPTOR
// =========================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Session expired, logging out...");
      await clearToken();
    }
    return Promise.reject(error);
  }
);


// =========================
// CUSTOMER APIs
// =========================

// 🔹 SEND OTP
export const sendOTP = (phone) => {
  return API.post("/auth/customer/send-otp", { phone });
};

// 🔹 VERIFY OTP
export const verifyOTP = (phone, otp) => {
  return API.post("/auth/customer/verify-otp", { phone, otp });
};

// 🔹 COMPLETE PROFILE
export const completeProfile = (name, phone) => {
  return API.post("/auth/customer/complete-profile", { name, phone });
};


// =========================
// MERCHANT APIs
// =========================

// 🔹 REGISTER (Merchant + Restaurant)
export const restaurantRegister = (data) => {
  return API.post("/auth/merchant/register", data);
};


// 🔹 LOGIN (Email / Phone)
export const restaurantLogin = (emailOrPhone, password) => {
  return API.post("/auth/merchant/login", {
    email_or_phone: emailOrPhone,
    password: password,
  });
};








// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://10.236.220.230:8000", // change to your IP
// });

// // 🔹 SEND OTP
// export const sendOTP = async (phone) => {
//   return axios.post(
//     "http://10.236.220.230:8000/auth/customer/send-otp",
//     {
//       phone: phone,
//     }
//   );
// };

// // 🔹 VERIFY OTP
// export const verifyOTP = async (phone, otp) => {
//   return axios.post(
//     "http://10.236.220.230:8000/auth/customer/verify-otp",
//     {
//       phone,
//       otp,
//     }
//   );
// };

// export const completeProfile = async (name, phone) => {
//   return axios.post(
//     "http://10.236.220.230:8000/auth/customer/complete-profile",
//     {
//       name,
//       phone
//     }
//   );
// };


// export const restaurantRegister = (data) => {
//   return axios.post("http://10.236.220.230:8000/auth/merchant/register", data);
// };