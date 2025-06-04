import { Category } from "src/constants/mainPage.constants";
import styled from "styled-components";

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleOpenModal: () => void;
  capacityFilter: number | null;
  selectedCategories: Record<Category, boolean>;
  handleCategoryToggle: (category: Category) => void;
  resetFilters: () => void;
}

function FilterControls({
  searchTerm,
  setSearchTerm,
  handleOpenModal,
  capacityFilter,
  selectedCategories,
  handleCategoryToggle,
  resetFilters,
}: FilterControlsProps) {
  return (
    <>
      <SearchWrapper>
        {/* TODO: 검색 아이콘 svg로 삽입하기 */}
        <Search
          placeholder="🔍 이름으로 검색하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchWrapper>
      <FilterWrapper>
        <CategoryWrapper>
          {(
            Object.keys(Category).filter((key) => isNaN(Number(key))) as Array<
              keyof typeof Category
            >
          ).map((key) => (
            <CategoryButton
              key={Category[key]}
              className={selectedCategories[Category[key]] ? "selected" : ""}
              onClick={() => handleCategoryToggle(Category[key])}
            >
              {key}
            </CategoryButton>
          ))}
        </CategoryWrapper>
        <ButtonWrapper>
          <Button onClick={handleOpenModal}>
            {/* TODO: 필터 아이콘 svg로 삽입하기 */}
            {capacityFilter ? `${capacityFilter}` : "👥"}
          </Button>
          <Button onClick={resetFilters}>↻</Button>
        </ButtonWrapper>
      </FilterWrapper>
    </>
  );
}

export default FilterControls;

const SearchWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const Search = styled.input`
  border-radius: 1.5rem;
  height: 3rem;
  width: 100%;
  padding-left: 1rem;
  box-sizing: border-box;

  border: 0.06rem solid black;
  background-color: white;

  &:focus {
    outline: none;
  }

  &:hover {
    outline: none;
  }
`;

const FilterWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const CategoryWrapper = styled.div`
  display: flex;
`;

const CategoryButton = styled.button`
  height: 2.5rem;
  margin-right: 0.25rem;
  border-radius: 2.5rem;
  box-sizing: border-box;

  font-size: 0.8rem;
  font-weight: 500;

  color: #1f2937;
  border: 0.06rem solid #1f2937;
  background-color: #ffffff;

  cursor: pointer;
  transition: all 0.17s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    border: 0.06rem solid #1f2937;
  }

  &.selected {
    color: #ffffff;
    border: 0.06rem solid #ff7b23;
    background-color: #ff7b23;

    &:hover {
      border: 0.06rem solid #ff7b23;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.25rem;
  box-sizing: border-box;

  border-radius: 1.25rem;
  border: 0.06rem solid #1f2937;
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.17s ease-in-out;

  &:focus {
    outline: none;
    border: 0.06rem solid #1f2937;
  }

  &:hover {
    outline: none;
    border: 0.06rem solid #1f2937;
  }
`;
