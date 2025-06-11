import { fetchShopDetail } from "@api/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Place } from "src/@types/index";
import backarrow from "src/assets/backarrow.svg";
import { styled } from "styled-components";

function Detail() {
  const { shopid } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchDetailData = async () => {
      setIsLoading(true);
      setError(null);
      console.log("isLoading = true");
      try {
        const data = await fetchShopDetail(Number(shopid));
        console.log("detail data:", data);
        const result: Place = data;
        setPlace(result);
      } catch (err) {
        setError("장소 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailData();
  }, [shopid]);

  const handleGoBack = () => {
    navigate(`/`); // 이전 페이지로 이동
  };

  if (isLoading) {
    return (
      <div>
        <h2>로딩 중 . . .</h2>
      </div>
    );
  }

  if (!place) {
    // placeData가 location.state를 통해 전달되지 않은 경우
    console.log(error);
    return (
      <div>
        <h2>장소 정보를 불러올 수 없습니다.</h2>
        <button onClick={handleGoBack}>목록으로 돌아가기</button>
        {/* TODO: 돌아가기 버튼 만들기 */}
      </div>
    );
  }

  const dayKorean = ["월", "화", "수", "목", "금", "토", "일"];
  const hoursList = Object.entries({
    mon: place.opening_info.opening_hours.Mon,
    tue: place.opening_info.opening_hours.Tue,
    wed: place.opening_info.opening_hours.Wed,
    thu: place.opening_info.opening_hours.Thu,
    fri: place.opening_info.opening_hours.Fri,
    sat: place.opening_info.opening_hours.Sat,
    sun: place.opening_info.opening_hours.Sun,
  }).map(([, hours], index) => {
    if (hours) {
      return {
        day: dayKorean[index],
        hours: hours,
      };
    } else {
      return { day: dayKorean[index], hours: "휴무" };
    }
  });

  console.log(hoursList);

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={handleGoBack}>
          <img src={backarrow} />
        </BackButton>
      </Header>
      {/* TODO: 뒷배경 너무 허전하니 적당한 일러스트 작업 후 absolute로 우상단에 보충 */}
      <BriefingWrapper>
        <CardImage src={place.shop_map_s3} />
        <BriefingText>
          <h1>{place.name}</h1>
          <HashtagWrapper>
            {place.tags.length > 0
              ? place.tags.map((tag, index) => (
                  <Hashtag key={index}>#{tag}</Hashtag>
                ))
              : ""}
          </HashtagWrapper>
        </BriefingText>
      </BriefingWrapper>

      <Scroller>
        <DetailWrapper>
          <Section>
            <SectionTitle>영업 정보</SectionTitle>
            {hoursList.map((item, index) => (
              <SectionItem key={index}>
                <Label>
                  {item.day} <Value>{item.hours}</Value>
                </Label>
              </SectionItem>
            ))}
            {place.opening_info.last_order ? (
              <SectionItem>
                <Label>
                  라스트오더 <Value>{place.opening_info.last_order}</Value>
                </Label>
              </SectionItem>
            ) : (
              ""
            )}
            {place.opening_info.break_time ? (
              <SectionItem>
                <Label>
                  브레이크타임 <Value>{place.opening_info.break_time}</Value>
                </Label>
              </SectionItem>
            ) : (
              ""
            )}
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
            <SectionTitle>학교로부터</SectionTitle>
            <SectionItem>
              <Label>
                거리 <Value>{place.dist}m</Value>
              </Label>
            </SectionItem>
            <SectionItem>
              <Label>
                도보 <Value>{place.walk_time}분</Value>
              </Label>
            </SectionItem>
            <SectionItem>
              <Label>
                차량 <Value>{place.vehicle_time}분</Value>
              </Label>
            </SectionItem>
            <SectionItem>
              <Label>
                주차{" "}
                <Value>
                  {place.is_parking == 0
                    ? "불가"
                    : place.is_parking == 1
                      ? "무료"
                      : "유료"}
                </Value>
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
  flex-grow: 1;
  min-height: 0;
  overflow: hidden;
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
    color: #252525;
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
  overflow-y: auto;
  overscroll-behavior-y: contain;
  flex-grow: 1;
  min-height: 0;
  margin: 1rem 1rem 0 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const DetailWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  margin-bottom: 1rem;

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
  color: #252525;
`;

const Value = styled.span`
  font-weight: 400;
  color: #252525;
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
