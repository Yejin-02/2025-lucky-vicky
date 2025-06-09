import {
  Category,
  INITIAL_SELECTED_CATEGORIES,
} from "@constants/mainPage.constants";
import { useEffect, useState } from "react";
import { Place } from "src/@types/index.d";
import { fetchShops, FetchShopsParams } from "src/api/client";

export function usePlaceFilters() {
  // 초기 필터 상태: 카테고리 all, 검색어 "", 인원 필터 null
  const [selectedCategories, setSelectedCategories] = useState(
    INITIAL_SELECTED_CATEGORIES,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);

  // 결과 저장 변수
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 토글 핸들러
  const handleCategoryToggle = (key: Category) => {
    setSelectedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 리셋 버튼 핸들러
  const resetFilters = () => {
    setSelectedCategories(INITIAL_SELECTED_CATEGORIES);
    setSearchTerm("");
    setCapacityFilter(null);
  };

  // 필터 조건에 따라 API 호출
  useEffect(() => {
    const fetchFilteredPlaces = async () => {
      setIsLoading(true);
      setError(null);
      console.log("isLoading = true");

      const categoryList = Object.entries(selectedCategories)
        .filter(([, v]) => v)
        .map(([k]) => k);

      console.log(categoryList);

      // API 파라미터 구성
      const params: FetchShopsParams = {
        skip: 0,
        limit: 100,
        shop_type: categoryList.join(","),
        is_active: true,
        sort_by: "walk_time",
        order: "asc",
      };

      console.log(params);

      try {
        const data = await fetchShops(params);
        console.log("shops data:", data.shops);

        let result: Place[] = data.shops;

        // 검색어 필터링
        if (searchTerm) {
          result = result.filter((place: Place) =>
            place.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        }

        // 인원 필터링
        if (capacityFilter !== null) {
          result = result.filter(
            (place: Place) =>
              place.max_cap !== undefined && place.max_cap >= capacityFilter,
          );
        }
        setFilteredPlaces(result);
      } catch (err) {
        setError("장소 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredPlaces();
  }, [capacityFilter, searchTerm, selectedCategories]);

  return {
    filteredPlaces,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryToggle,
    capacityFilter,
    setCapacityFilter,
    resetFilters,
  };
}
