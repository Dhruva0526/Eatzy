import axios from "axios";
import API from "./api";

// ✅ GET PROFILE
export const getProfile = async (identifier) => {
  const res = await API.get(`/profile`, {
    params: { identifier }
  });
  return res.data;
};

// ✅ UPDATE PROFILE
export const updateProfile = async (identifier, data) => {
  const res = await API.put(`/profile`, data, {
    params: { identifier }
  });
  return res;
};



export const uploadProfileImage = async (identifier, image) => {
  const formData = new FormData();

  formData.append("file", {
    uri: image.uri,
    name: "profile.jpg",
    type: "image/jpeg",
  });

  const res = await API.put(
    `/profile/upload-image`,
    formData,
    {
      params: { identifier },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};