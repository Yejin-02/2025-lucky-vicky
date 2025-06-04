import React, { useEffect, useRef, useState } from "react"; // useState 추가
import { useNavigate } from "react-router-dom";
import { Place } from "src/@types/index";
import { fetchShopDetail } from "src/api/client";
import icon0Url from "src/assets/IconType0.svg";
import icon1Url from "src/assets/IconType1.svg";
import icon2Url from "src/assets/IconType2.svg";
import { styled } from "styled-components";

interface Props {
  place: Place;
}
/*
// TODO 파싱함수 수정 필요
function parseOpeningHours(data: OpeningHours): string {
  const daysOfWeek: (keyof DaySchedule)[] = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ];
  let result = "";

  // Helper function to format opening/closing time
  const formatDisplayTime = (time: string | null): string => {
    return time ? time.replace(/:00/g, "").replace("~", "시~") + "시" : "휴무";
  };

  // Helper function to format break or last order time (single point or range)
  const formatSingleOrRangeTime = (
    time: string | null,
    isBreakTime: boolean = false,
  ): string => {
    if (!time) return "";
    const formatted = time.replace(/:00/g, "");
    return isBreakTime ? formatted.replace("~", "~") + "시" : formatted;
  };

  // Helper function to get Korean day label
  function getDayLabel(day: keyof DaySchedule): string {
    const dayLabels: { [key in keyof DaySchedule]: string } = {
      mon: "월",
      tue: "화",
      wed: "수",
      thu: "목",
      fri: "금",
      sat: "토",
      sun: "일",
    };
    return dayLabels[day] || day;
  }

  // Process normal hours
  const normalHours = daysOfWeek.map((day) => ({
    day,
    time: data.normal[day],
  }));
  const allSameNormalHours = normalHours.every(
    (item) => item.time === normalHours[0].time,
  );

  if (allSameNormalHours && normalHours[0].time) {
    result += `매일 ${formatDisplayTime(normalHours[0].time)} 영업\n`;
  } else {
    const openDays = normalHours.filter((item) => item.time);
    if (openDays.length > 0) {
      result += "영업시간:\n";
      openDays.forEach((item) => {
        result += `${getDayLabel(item.day)}: ${formatDisplayTime(item.time)}\n`;
      });
    } else {
      result += "매장 휴무\n";
    }
  }

  // Process break time
  const breakTimes = daysOfWeek.map((day) => ({
    day,
    time: data.breaktime[day],
  }));
  const activeBreakTimes = breakTimes.filter((item) => item.time); // Filter out nulls before checking allSame

  if (activeBreakTimes.length > 0) {
    const allSameBreakTimes = activeBreakTimes.every(
      (item) => item.time === activeBreakTimes[0].time,
    );
    if (allSameBreakTimes && activeBreakTimes[0].time) {
      result += `브레이크타임: ${formatSingleOrRangeTime(activeBreakTimes[0].time, true)}\n`;
    } else {
      result += "브레이크타임:\n";
      activeBreakTimes.forEach((item) => {
        result += `${getDayLabel(item.day)}: ${formatSingleOrRangeTime(item.time, true)}\n`;
      });
    }
  }

  // Process last order
  const lastOrders = daysOfWeek.map((day) => ({
    day,
    time: data.lastorder[day],
  }));
  const activeLastOrders = lastOrders.filter((item) => item.time); // Filter out nulls

  if (activeLastOrders.length > 0) {
    const allSameLastOrders = activeLastOrders.every(
      (item) => item.time === activeLastOrders[0].time,
    );
    if (allSameLastOrders && activeLastOrders[0].time) {
      result += `라스트오더: ${formatSingleOrRangeTime(activeLastOrders[0].time)}\n`;
    } else {
      result += "라스트오더:\n";
      activeLastOrders.forEach((item) => {
        result += `${getDayLabel(item.day)}: ${formatSingleOrRangeTime(item.time)}\n`;
      });
    }
  }

  // Add exception
  if (data.exception) {
    result += data.exception;
  }

  return result.trim(); // Remove any trailing newline
}
*/
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
      const response = await fetchShopDetail(place.pk);
      navigate(`/place/${place.pk}`, { state: response.data });
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
            <DetailRow>주차 {place.is_parking ? "가능" : "불가"}</DetailRow>
          </DetailCol>
          <DetailCol>
            {/*
            <DetailRow>{parseOpeningHours(place.opening_hours)}</DetailRow>
            */}
            <DetailRow>영업 중</DetailRow>
            <DetailRow>휴무일 없음</DetailRow>
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
