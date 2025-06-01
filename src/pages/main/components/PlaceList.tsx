import { Place } from "src/@types/index";
import styled from "styled-components";

import ListItem from "./ListItem";

// PlaceList.tsx
interface PlaceListProps {
  places: Place[];
}

function PlaceList({ places }: PlaceListProps) {
  // TODO: 로딩 중인지 체크하는 진짜 로직 추가 필요
  const isLoading = false;

  return (
    <ListWrapper>
      {isLoading ? (
        <NoResultsMessage>로딩 중입니다</NoResultsMessage>
      ) : places.length > 0 ? (
        places.map((place) => <ListItem key={place.pK} place={place} />)
      ) : (
        <NoResultsMessage>조건에 맞는 장소가 없습니다.</NoResultsMessage>
      )}
    </ListWrapper>
  );
}

export default PlaceList;

const ListWrapper = styled.ul`
  display: flexbox;
  flex-direction: column;

  padding: 0 1rem 0 1rem;
  margin: 0;
  width: 100%;
  box-sizing: border-box;

  overflow-y: auto;
  overscroll-behavior-y: contain;
  flex-grow: 1;
  min-height: 0;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 1.25rem;
  color: #777;
`;
