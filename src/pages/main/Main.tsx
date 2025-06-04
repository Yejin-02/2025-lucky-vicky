import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CapacityModal from "../main/components/CapacityModal";
import FilterControls from "../main/components/FilterControls";
import PlaceList from "../main/components/PlaceList";
import { usePlaceFilters } from "../main/hooks/usePlaceFilters";

function Main() {
  const navigate = useNavigate();
  const {
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
  } = usePlaceFilters();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeaderClick = () => {
    resetFilters();
    navigate("/");
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Wrapper>
      <Header>
        <span onClick={handleHeaderClick}>EatG</span>
      </Header>
      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleOpenModal={handleOpenModal}
        capacityFilter={capacityFilter}
        selectedCategories={selectedCategories}
        handleCategoryToggle={handleCategoryToggle}
        resetFilters={resetFilters}
      />
      {isLoading ? (
        <NoResultsMessage>로딩 중...</NoResultsMessage>
      ) : error ? (
        <NoResultsMessage>{error}</NoResultsMessage>
      ) : (
        <PlaceList places={filteredPlaces} />
      )}
      <CapacityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApply={(capacity) => {
          setCapacityFilter(capacity); // 훅에서 제공하는 setter 사용
          handleCloseModal(); // 모달 닫기는 여기서 명시적으로 호출
        }}
      />
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  overflow: hidden;
`;

const Header = styled.div`
  background-color: #ff7b23;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 3rem;
  height: 3rem;
  > span {
    cursor: pointer;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 1.25rem;
  color: #777;
`;
