import { useLocation, useNavigate } from "react-router-dom";
import { Place } from "src/@types/index";
import backarrow from "src/assets/backarrow.svg";
import { styled } from "styled-components";

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
    <Wrapper>
      <Header>
        <BackButton onClick={handleGoBack}>
          <img src={backarrow} />
        </BackButton>
      </Header>
      {/* TODO: 뒷배경 너무 허전하니 적당한 일러스트 작업 후 absolute로 우상단에 보충 */}
      <BriefingWrapper>
        <CardImage src={place.shop_img_S3} />
        <BriefingText>
          <h1>{place.name}</h1>
          <HashtagWrapper>
            {place.tag.map((tag, index) => (
              <Hashtag key={index}>#{tag}</Hashtag>
            ))}
          </HashtagWrapper>
        </BriefingText>
      </BriefingWrapper>

      {/* TODO: 이미지 태그 상호명 보여주는 섹션 만들기 */}
      <Scroller>
        <DetailWrapper>
          <Section>
            <SectionTitle>영업 정보</SectionTitle>
            {/* TODO: API 나오면 데이터 포맷 맞춰서 이 부분 채우기 */}
            <SectionItem>
              <Label>
                휴무일 <Value>없음</Value>
              </Label>
            </SectionItem>
          </Section>
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
             TODO 나중에 구현
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
      </Scroller>
    </Wrapper>
  );
}

export default Detail;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 0.3rem;
  width: 100%;
  display: inline-flex;
  box-sizing: border-box;
`;

const BackButton = styled.div`
  padding: 0.7rem;
  display: inline-flex;
  align-items: center;
  height: 2.9rem;
  width: 2.9rem;
  box-sizing: border-box;
  cursor: pointer;
  > img {
    height: 1.7rem;
  }
`;

const BriefingWrapper = styled.div`
  display: flex;
  margin: 0 1rem;
  gap: 0.5rem;
`;

const BriefingText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 0.5rem;
  height: 10rem;
  > h1 {
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 0;
    text-align: left;
  }
`;

const HashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
  box-sizing: border-box;
  overflow: auto;
`;

const Hashtag = styled.div`
  background-color: #ffd0b5;
  color: #ff6b35;

  padding: 0 0.4rem;
  border-radius: 0.5rem;

  font-size: 0.8rem;
  flex: 0 0 auto;
`;
const CardImage = styled.img`
  height: 10rem;
  width: 7.5rem;
  object-fit: cover;
  border-radius: 1rem;
`;

const Scroller = styled.div`
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const DetailWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  margin: 1rem 1rem;

  background-color: white;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const SectionTitle = styled.div`
  display: inline-flex;

  font-size: 1.1rem;
  line-height: 2rem;
  height: 2rem;

  font-weight: 600;
  color: #ff7b23;
  border-bottom: 0.06rem solid #ddd;

  cursor: default;
`;

const SectionItem = styled.div`
  display: inline-flex;
  cursor: default;
`;

const Label = styled.span`
  font-weight: 600;
  line-height: 2rem;
`;

const Value = styled.span`
  font-weight: 400;
`;

const LinkButton = styled.a`
  width: 100%;
  height: 2.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff7b23;
  color: white;
  border-radius: 0.45rem;
  margin: 0.5rem 0 0 0;
  text-decoration: none;
  &:hover,
  &:active,
  &:visited {
    color: white;
  }
`;

/* 
          *** 나중에 구현
const ImageScroller = styled.div`
  display: flex;
  overflow: scroll;
`;

const StyledImage = styled.img``;
*/
