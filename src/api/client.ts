import axios from "axios";

const apiBase = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiBase,
  timeout: 10000,
});

export interface FetchShopsParams {
  skip?: number;
  limit?: number;
  shop_type?: string;
  min_capacity?: number;
  max_capacity?: number;
  tags?: string;
  min_rating?: number;
  is_active?: boolean;
  has_parking?: boolean;
  sort_by?: string;
  order?: string;
}

export const fetchShops = (params?: FetchShopsParams) => {
  return apiClient.get("/shops/", { params }).then((res) => res.data);
};

export const fetchShopDetail = (shopId: number) => {
  return apiClient.get(`/shops/${shopId}`).then((res) => res.data);
};
