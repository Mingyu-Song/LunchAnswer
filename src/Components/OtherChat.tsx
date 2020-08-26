import React from "react";
import styled from "styled-components";
import msgBefore from "assets/msg_before_w.png";
import msgAfter from "assets/msg_after_w.png";
import msgBeforeMain from "assets/msg_before.png";
import msgAfterMain from "assets/msg_after.png";
import ChatKeyFrames from "Styles/ChatKeyFrames";

type chatProps = {
  // children: React.ReactChild; // props로 받아서 출력할 message
  children:
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | boolean
    | null
    | undefined; // props로 받아서 출력할 message
  isMain?: boolean; // main page에서 사용할경우 props로 true값을 넘겨주면 알아서 스타일 변경
  isDelay?: string; // test page에서 채팅창 애니메이션 딜레이
};

const OtherChat = ({ children, isMain, isDelay }: chatProps) => {
  return (
    <MessageBox isMain={isMain} isDelay={isDelay}>
      {children && (
        <img alt="msg_before" src={isMain ? msgBeforeMain : msgBefore} />
      )}
      <p>{children}</p>
      {children && (
        <img alt="msg_after" src={isMain ? msgAfterMain : msgAfter} />
      )}
    </MessageBox>
  );
};

export default React.memo(OtherChat);

const MessageBox = styled.article`
  p {
    background-color: ${(props) =>
      props.isMain ? props.theme.lightGray : "white"};
  }

  animation: ${ChatKeyFrames} 0.8s linear 0s;
  animation-delay: ${(props) => props.isDelay};
  ${(props) => props.theme.MessageBox};
`;
