import React, { useEffect, useRef, useState } from "react"; // useState 추가
import { useNavigate } from "react-router-dom";
import { Place } from "src/@types/index";
import icon0Url from "src/assets/IconType0.svg";
import icon1Url from "src/assets/IconType1.svg";
import icon2Url from "src/assets/IconType2.svg";
import { styled } from "styled-components";

interface Props {
  place: Place;
}

function ListItem({ place }: Props) {
  const iconMap = {
    0: icon0Url,
    1: icon1Url,
    2: icon2Url,
  } as const;

  const iconSrc = iconMap[place.type];

  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleClick = async () => {
    try {
      navigate(`/place/${place.pk}`);
    } catch (error) {
      console.error("Place ID is missing, cannot navigate.");
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollerRef.current) {
        const { scrollWidth, clientWidth } = scrollerRef.current;
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };

    checkOverflow();

    // 윈도우 리사이즈 시 오버플로우 재체크
    // (실제 앱에서는 디바운스/쓰로틀링을 고려하는 것이 좋습니다)
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const parseOpeningInfo = (place: Place) => {
    const dayKorean = ["월", "화", "수", "목", "금", "토", "일"];
    const closedDays: string[] = [];
    Object.entries({
      mon: place.opening_info.opening_hours.Mon,
      tue: place.opening_info.opening_hours.Tue,
      wed: place.opening_info.opening_hours.Wed,
      thu: place.opening_info.opening_hours.Thu,
      fri: place.opening_info.opening_hours.Fri,
      sat: place.opening_info.opening_hours.Sat,
      sun: place.opening_info.opening_hours.Sun,
    }).forEach(([, hours], index) => {
      if (hours === null) {
        closedDays.push(dayKorean[index]);
      }
    });
    return closedDays.length > 0
      ? `${closedDays.join(", ")} 휴무`
      : "매일 영업";
  };

  return (
    <ListCard onClick={handleClick}>
      <ImageWrapper>
        <CardImage src={place.shop_map_s3} />
        <IconImage src={iconSrc} alt={`Icon ${place.type}`} />
      </ImageWrapper>
      <Wrapper>
        <PlaceName>{place.name}</PlaceName>
        <DetailWrapper>
          <DetailCol>
            <DetailRow>도보 {place.walk_time}분</DetailRow>
            <DetailRow>차량 {place.vehicle_time}분</DetailRow>
            {/*불가 0, 무료 1, 유료 2*/}
            <DetailRow>
              주차{" "}
              {place.is_parking == 0
                ? "불가"
                : place.is_parking == 1
                  ? "무료"
                  : "유료"}
            </DetailRow>
          </DetailCol>
          <DetailCol>
            {/*
            <DetailRow>{parseOpeningHours(place.opening_hours)}</DetailRow>
            */}
            <DetailRow>{place.is_active ? "영업 중" : "영업 종료"}</DetailRow>
            <DetailRow>{parseOpeningInfo(place)}</DetailRow>
            <DetailRow>최대 {place.max_cap}명</DetailRow>
          </DetailCol>
        </DetailWrapper>
        <HashtagWrapper>
          <HashtagListScroller ref={scrollerRef} $isOverflowing={isOverflowing}>
            {place.tags.length > 0
              ? place.tags.map((tag, index) => (
                  <Hashtag key={index}>#{tag}</Hashtag>
                ))
              : ""}
          </HashtagListScroller>
        </HashtagWrapper>
      </Wrapper>
    </ListCard>
  );
}

const ListCard = styled.div`
  background-color: #fefefe;
  box-shadow: 0 0.25rem 0.28rem rgba(0, 0, 0, 0.16);
  height: 10rem;
  width: 100%;
  border-radius: 1rem;
  margin-bottom: 1rem;
  display: flex;
  overflow: hidden;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  height: 10rem;
  width: 7.5rem;
  position: relative;
`;

const CardImage = styled.img`
  height: 10rem;
  width: 7.5rem;
  object-fit: cover;
`;

const IconImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  margin: 0.65rem;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlaceName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  margin: 0;

  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #252525;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const DetailCol = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const DetailRow = styled.div`
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.5rem;
  color: #252525;
  white-space: nowrap;
  overflow: hidden;
`;

const HashtagWrapper = styled.div`
  width: 100%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 1rem;
    height: 100%;
    background: linear-gradient(to left, #fefefe, rgba(254, 254, 254, 0.1));
    pointer-events: none;
  }
`;

const HashtagListScroller = styled.div<{ $isOverflowing: boolean }>`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  box-sizing: border-box;

  overflow: auto;
  padding-right: ${({ $isOverflowing }) => ($isOverflowing ? "1rem" : "0")};
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Hashtag = styled.div`
  background-color: #ffd0b5;
  color: #ff6b35;

  padding: 0 0.4rem;
  border-radius: 0.5rem;

  font-size: 0.8rem;
  flex: 0 0 auto;
`;

export default ListItem;
