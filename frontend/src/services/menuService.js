import API from "./api";

// ✅ PUBLIC MENU (Customer App)
export const getMenu = async (restaurantId) => {
  const res = await API.get(
    `/menu/restaurant/${restaurantId}`
  );

  return res.data;
};

// ✅ MERCHANT MENU
export const getMyMenu = async (identifier) => {
  const res = await API.get(
    `/menu/my-menu?identifier=${identifier}`
  );

  return res.data;
};

// ✅ ADD ITEM
export const addMenuItem = async (
  identifier,
  data
) => {

  const res = await API.post(
    `/menu/my-menu?identifier=${identifier}`,
    data
  );

  return res.data;
};

// ✅ UPDATE ITEM
export const updateMenuItem = async (
  id,
  identifier,
  data
) => {

  const res = await API.put(
    `/menu/my-menu/${id}?identifier=${identifier}`,
    data
  );

  return res.data;
};

// ✅ TOGGLE STATUS
export const toggleMenuItem = async (
  id,
  identifier
) => {

  const res = await API.put(
    `/menu/my-menu/${id}/toggle?identifier=${identifier}`
  );

  return res.data;
};

// ✅ DELETE ITEM
export const deleteMenuItem = async (
  id,
  identifier
) => {

  const res = await API.delete(
    `/menu/my-menu/${id}?identifier=${identifier}`
  );

  return res.data;
};