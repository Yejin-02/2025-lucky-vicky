export interface DaySchedule {
  Mon: string | null;
  Tue: string | null;
  Wed: string | null;
  Thu: string | null;
  Fri: string | null;
  Sat: string | null;
  Sun: string | null;
}

export interface OpeningHours {
  break_time: null;
  last_order: "20:30";
  opening_hours: DaySchedule;
}

import { Category } from "@constants/mainPage.constants";

export interface Place {
  pk: number;
  name: string;
  dist: number;
  walk_time: number;
  pubtrans_time: number;
  vehicle_time: number;
  is_parking: number;
  opening_info: OpeningHours;
  significant: string;
  max_cap: number;
  table_cap: number;
  table_map_s3: string;
  shop_map_s3: string;
  naver_link: string;
  kakao_link: string;
  type: Category;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface FilterOptions {
  categories: string[]; // 선택된 카테고리 배열
}
