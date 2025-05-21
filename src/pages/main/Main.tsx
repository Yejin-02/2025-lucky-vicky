import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CapacityModal from "../main/components/CapacityModal";
import FilterControls from "../main/components/FilterControls";
import PlaceList from "../main/components/PlaceList";
import { usePlaceFilters } from "../main/hooks/usePlaceFilters";
import { usePlacesData } from "../main/hooks/usePlacesData";

function Main() {
  const navigate = useNavigate();
  const { places } = usePlacesData();
  const {
    filteredPlaces,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryToggle,
    capacityFilter,
    setCapacityFilter,
    resetFilters,
  } = usePlaceFilters(places);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeaderClick = () => {
    resetFilters();
    navigate("/");
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div>
      <Header onClick={handleHeaderClick}>EatG</Header>
      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleOpenModal={handleOpenModal}
        capacityFilter={capacityFilter}
        selectedCategories={selectedCategories}
        handleCategoryToggle={handleCategoryToggle}
        resetFilters={resetFilters}
      />
      <PlaceList places={filteredPlaces} />
      <CapacityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={(capacity) => {
          setCapacityFilter(capacity); // 훅에서 제공하는 setter 사용
          handleCloseModal(); // 모달 닫기는 여기서 명시적으로 호출
        }}
      />
    </div>
  );
}

export default Main;

const Header = styled.div`
  background-color: #ff7b23;
  text-align: center;
  color: white;
  font-size: 1.5em;
  font-weight: 600;
  line-height: 2;
`;
