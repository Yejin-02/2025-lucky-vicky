import { Place } from "src/@types/index";
import styled from "styled-components";

import ListItem from "./ListItem";

// PlaceList.tsx
interface PlaceListProps {
  places: Place[];
}

function PlaceList({ places }: PlaceListProps) {
  return (
    <ListWrapper>
      {places.length > 0 ? (
        places.map((place) => <ListItem key={place.pK} place={place} />)
      ) : (
        <NoResultsMessage>조건에 맞는 장소가 없습니다.</NoResultsMessage>
      )}
    </ListWrapper>
  );
}

export default PlaceList;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  padding: 0 16px 0 16px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
`;
