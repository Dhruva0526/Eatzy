import API from "./api";

// ✅ GET RESTAURANT RESERVATIONS
export const getRestaurantReservations = async (
  restaurantId
) => {

  const res = await API.get(
    `/table-booking/restaurant/${restaurantId}`
  );

  return res.data;
};


// ✅ UPDATE RESERVATION STATUS
export const updateReservationStatus = async (
  bookingId,
  status
) => {

  const res = await API.put(
    `/table-booking/${bookingId}/status?status=${status}`
  );

  return res.data;
};