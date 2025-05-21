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
              isSelect={selectedCategories[Category[key]]}
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
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const Search = styled.input`
  border-radius: 24px;
  height: 48px;
  width: 100%;
  padding-left: 16px;
  box-sizing: border-box;

  border: 1px solid #1f2937;
  background-color: #ffffff;

  &:focus {
    outline: none;
  }

  &:hover {
    outline: none;
    border: 1px solid #1f2937;
  }
`;

const FilterWrapper = styled.div`
  padding: 0 16px 16px 16px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const CategoryWrapper = styled.div`
  display: flex;
`;

interface CategoryButtonProps {
  isSelect: boolean;
}
const CategoryButton = styled.button<CategoryButtonProps>`
  height: 40px;
  margin-right: 4px;
  border-radius: 40px;

  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.isSelect ? "#ffffff" : "#1f2937")};
  border: 1px solid ${(props) => (props.isSelect ? "#ff7b23" : "#1f2937")};
  background-color: ${(props) => (props.isSelect ? "#ff7b23" : "#ffffff")};

  cursor: pointer;
  transition: all 0.17s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    outline: none;
    border: 1px solid ${(props) => (props.isSelect ? "#ff7b23" : "#1f2937")};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #1f2937;
  background-color: #ffffff;
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }

  &:hover {
    outline: none;
    border: 1px solid #1f2937;
  }
`;
