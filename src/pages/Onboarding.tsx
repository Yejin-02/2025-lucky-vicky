import logoUrl from "src/assets/eatGlogo.svg";
import styled from "styled-components";

function Onboarding() {
  return (
    <Wrapper>
      <div>
        <LogoImg src={logoUrl} alt={"EatG"} />
        <p>오늘 회식 어디서 하지?</p>
        <p>고민 될 땐 EatG에서</p>
        <WrapperTypeTwo>
          <HashTag>수용 인원</HashTag>
          <HashTag>영업 정보</HashTag>
          <HashTag>이동 거리</HashTag>
        </WrapperTypeTwo>
        <p>궁금한 정보를 한 눈에!</p>
      </div>
      <LinkButton href={"/"}>확인하러 가기</LinkButton>
    </Wrapper>
  );
}

export default Onboarding;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ff7b23;
  height: 100vh;
  align-items: center;
  justify-content: center;
  > div > p {
    color: white;
    line-height: 1rem;
    font-size: 1rem;
  }
  padding: 0 4rem;
`;

const LogoImg = styled.img`
  height: 5rem;
`;

const WrapperTypeTwo = styled.div`
  display: flex;
  column-gap: 0.5rem;
  margin-bottom: 1rem;
`;

const HashTag = styled.div`
  background-color: #ffd0b5;
  color: #ff7b23;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 2.2rem;
  padding: 0 0.5rem;
  border-radius: 0.3rem;
`;

const LinkButton = styled.a`
  width: 100%;
  height: 2.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #ff7b23;
  border-radius: 0.45rem;
  margin: 4rem 0 0 0;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 2rem;
  &:hover,
  &:active,
  &:visited {
    color: #ff7b23;
  }
`;
