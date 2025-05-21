import {
  Category,
  INITIAL_SELECTED_CATEGORIES,
} from "@constants/mainPage.constants";
import { useMemo, useState } from "react";
import { Place } from "src/@types/index.d";

// 초기 필터 상태: 카테고리 all, 검색어 "", 인원 필터 null
export function usePlaceFilters(allPlaces: Place[]) {
  const [selectedCategories, setSelectedCategories] = useState(
    INITIAL_SELECTED_CATEGORIES,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);

  // 카테고리 토글 핸들러
  const handleCategoryToggle = (key: Category) => {
    setSelectedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 리셋 핸들러러
  const resetFilters = () => {
    setSelectedCategories(INITIAL_SELECTED_CATEGORIES);
    setSearchTerm("");
    setCapacityFilter(null);
  };

  // 필터 적용
  const filteredPlaces = useMemo(() => {
    return allPlaces
      .filter((place) => selectedCategories[place.type])
      .filter((place) => {
        if (!searchTerm) return true;
        return place.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter((place) => {
        if (capacityFilter === null) return true;
        return place.max_cap !== undefined && place.max_cap >= capacityFilter;
      });
  }, [allPlaces, selectedCategories, searchTerm, capacityFilter]);

  return {
    filteredPlaces,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryToggle,
    capacityFilter,
    setCapacityFilter,
    resetFilters,
  };
}
