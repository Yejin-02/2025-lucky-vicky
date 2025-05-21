import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Place } from "src/@types/index";

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
      <h2>
        {place.name} (ID: {place.pK})
      </h2>
    </div>
  );
}

export default Detail;
