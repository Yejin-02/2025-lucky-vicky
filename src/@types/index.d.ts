export interface DaySchedule {
  mon: string | null;
  tue: string | null;
  wed: string | null;
  thu: string | null;
  fri: string | null;
  sat: string | null;
  sun: string | null;
}

export interface OpeningHours {
  normal: DaySchedule;
  breaktime: DaySchedule;
  lastorder: DaySchedule;
  exception?: string;
}

import { Category } from "@constants/mainPage.constants";

export interface Place {
  pK: number;
  name: string;
  shop_img_S3: string;
  walk_dist: number;
  vehicle_dist: number;
  walk_time: number;
  pubtrans_time: number;
  vehicle_time: number;
  is_parking: boolean;
  opening_hours: OpeningHours;
  max_cap: number;
  table_cap: number;
  table_map_S3: string;
  shop_map_S3: string;
  tag: string[];
  naver_link: string;
  kakao_link: string;
  type: Category;
}

export interface FilterOptions {
  categories: string[]; // 선택된 카테고리 배열
}
