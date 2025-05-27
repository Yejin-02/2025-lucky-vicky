import { useLocation, useNavigate } from "react-router-dom";
import { Place } from "src/@types/index";
import { styled } from "styled-components";

import ListItem from "./main/components/ListItem";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용

  const place = location.state?.placeData as Place | undefined;

  const handleGoBack = () => {
    navigate(`/`); // 이전 페이지로 이동
  };

  if (!place) {
    // placeData가 location.state를 통해 전달되지 않은 경우
    return (
      <div>
        <h2>장소 정보를 불러올 수 없습니다.</h2>
        <button onClick={handleGoBack}>목록으로 돌아가기</button>
        {/* TODO: 돌아가기 버튼 만들기 */}
      </div>
    );
  }

  return (
    <div>
      <Header>
        <BackButton onClick={handleGoBack}>
          <svg
            viewBox="0 0 50 50"
            fill="none"
            style={{
              marginTop: "12px",
              width: "50px",
              height: "40px",
              boxSizing: "border-box",
            }}
          >
            <path
              d="M25 30L13 20L25 10"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BackButton>
      </Header>
      <CardWrapper>
        <ListItem place={place} />
      </CardWrapper>

      <DetailWrapper>
        <Section>
          <SectionTitle>수용 정보</SectionTitle>
          <SectionItem>
            <Label>
              최대 수용 인원 <Value>{place.max_cap}명</Value>
            </Label>
          </SectionItem>
          <SectionItem>
            <Label>
              테이블 당 최대 인원 <Value>{place.table_cap}명</Value>
            </Label>
          </SectionItem>
          {/* 
          *** 나중에 구현
          <SectionItem>
            <Label>내부 이미지</Label>
            <ImageScroller>
              <StyledImage />
            </ImageScroller>
          </SectionItem>
          */}
        </Section>
        <Section>
          <SectionTitle>학교로부터 거리</SectionTitle>
          <SectionItem>
            <Label>
              대중교통 <Value>{place.pubtrans_time}분</Value>
            </Label>
          </SectionItem>
          <SectionItem>
            <Label>
              차량 <Value>{place.vehicle_time}분</Value>
            </Label>
          </SectionItem>
          <SectionItem>
            <Label>
              도보 <Value>{place.walk_time}분</Value>
            </Label>
          </SectionItem>
          <LinkButton href={place.kakao_link} target="_blank">
            카카오지도 바로가기
          </LinkButton>
          <LinkButton href={place.naver_link} target="_blank">
            네이버지도 바로가기
          </LinkButton>
        </Section>
      </DetailWrapper>
    </div>
  );
}

export default Detail;

const Header = styled.div`
  padding: 8px;
`;

const BackButton = styled.div`
  width: 40px;
  height: 40px;
  top: 16px;
  left: 16px;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  padding: 0 16px;
  margin: 0 0 20px 0;
`;

const DetailWrapper = styled.div`
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-sizing: border-box;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.p`
  display: flex;
  align-items: baseline;
  margin: 6px 0;
  padding: 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #ff7b23;
  border-bottom: 1px solid #e0e0e0;
`;

const SectionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 4px 0;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Value = styled.span`
  font-weight: 400;
`;

const LinkButton = styled.a`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff7b23;
  color: white;
  border-radius: 12px;
  margin: 6px 0;
  text-decoration: none;
`;

{
  /* 
          *** 나중에 구현
const ImageScroller = styled.div`
  display: flex;
  overflow: scroll;
`;

const StyledImage = styled.img``;
*/
}
