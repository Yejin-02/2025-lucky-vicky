import { useNavigate } from "react-router-dom";
import { DaySchedule, OpeningHours, Place } from "src/@types/index";
import icon0Url from "src/assets/IconType0.svg";
import icon1Url from "src/assets/IconType1.svg";
import icon2Url from "src/assets/IconType2.svg";
import { styled } from "styled-components";

interface Props {
  place: Place;
}

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

function ListItem({ place }: Props) {
  const iconMap = {
    0: icon0Url,
    1: icon1Url,
    2: icon2Url,
  } as const;

  const iconSrc = iconMap[place.type];

  const navigate = useNavigate();

  const handleClick = () => {
    if (place && place.pK) {
      navigate(`/place/${place.pK}`, { state: { placeData: place } });
    } else {
      console.error("Place ID is missing, cannot navigate.");
    }
  };

  return (
    <ListCard onClick={handleClick}>
      <ImageWrapper>
        <CardImage src={place.shop_img_S3} />
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
            <DetailRow>최대 인원 {place.max_cap}명</DetailRow>
          </DetailCol>
        </DetailWrapper>
        <HashtagWrapper>
          {place.tag.map((tag, index) => (
            <Hashtag key={index}>#{tag}</Hashtag>
          ))}
        </HashtagWrapper>
      </Wrapper>
    </ListCard>
  );
}

const ListCard = styled.div`
  background-color: #fefefe;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  height: 160px;
  width: 100%;
  border-radius: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  height: 160px;
  width: 120px;
  position: relative;
`;

const CardImage = styled.img`
  height: 160px;
  width: 120px;
  background-color: black;
`;

const IconImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  margin: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PlaceName = styled.h1`
  font-size: large;
  line-height: 0;
  text-align: left;
  margin-bottom: 20px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const DetailCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: baseline;
  justify-content: baseline;
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
  font-size: 14px;
  margin: 0;
  width: 100%;
  height: 26px;
`;

const HashtagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

const Hashtag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffd0b5;
  color: #ff6b35;

  margin-top: 4px;
  padding: 0px 8px;
  border-radius: 6px;

  font-size: 12px;
  font-weight: 400;
`;

export default ListItem;
