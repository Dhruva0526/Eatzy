import API from './api';

export const getRestaurants = (city) => {
  return API.get(`/restaurants?city=${city}`);
};