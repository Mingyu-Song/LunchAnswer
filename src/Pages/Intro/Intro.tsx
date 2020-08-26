import React from "react";
import styled from "styled-components";
import IntroLogo from "./IntroLogo";
import IntroChatField from "./IntroChatField";
import Button from "Components/Button";

const Intro = ({ history }) => {
  return (
    <IntroBox>
      <IntroLogo />
      <IntroChatField />
      <ButtonWrap>
        <Button
          color="yellow"
          mouseAction={true}
          eventFunc={() => history.push("/test")}
        >
          <div>
            <b>점심</b> 메뉴
            <br />
            테스트
          </div>
        </Button>
        <Button
          color="white"
          mouseAction={true}
          eventFunc={() => history.push("/random")}
        >
          <div>
            귀찮을 땐<br />
            <b>랜덤 </b>
            메뉴
          </div>
        </Button>
      </ButtonWrap>
    </IntroBox>
  );
};

export default React.memo(Intro);

const IntroBox = styled.div`
  margin: 0 auto;
  max-width: 480px;
  width: 100vw;
  height: 100vh;
  padding: 0 21px;
  background-color: ${({ theme }) => theme.mainOrange};
`;
const ButtonWrap = styled.div`
  padding: 29px 0;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 9px;
  grid-auto-flow: column;
`;
