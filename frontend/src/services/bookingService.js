import API from "./api";

// CREATE BOOKING
export const createBooking = async (data) => {
  const res = await API.post(
    "/table-booking/create",
    data
  );

  return res.data;
};

// GET USER BOOKINGS
export const getUserBookings = async (
  userId
) => {

  const res = await API.get(
    `/table-booking/user/${userId}`
  );

  return res.data;
};

// GET RESTAURANT BOOKINGS
export const getRestaurantBookings = async (
  restaurantId
) => {

  const res = await API.get(
    `/table-booking/restaurant/${restaurantId}`
  );

  return res.data;
};

// UPDATE BOOKING STATUS
export const updateBookingStatus = async (
  bookingId,
  status
) => {

  const res = await API.put(
    `/table-booking/${bookingId}/status?status=${status}`
  );

  return res.data;
};