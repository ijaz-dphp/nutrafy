import axios from "axios";

const storeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
});

export const getStoreCart = async () => {
  const { data } = await storeApi.get("/wc/store/cart");
  return data;
};

export const addStoreCartItem = async (id: number, quantity = 1) => {
  const { data } = await storeApi.post("/wc/store/cart/add-item", { id, quantity });
  return data;
};
