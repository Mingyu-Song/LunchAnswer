import React from "react";
import styled from "styled-components";
import MyChat from "Components/MyChat";
import OtherChat from "Components/OtherChat";
import { useState, useEffect } from "react";

const IntroChatField = () => {
  const [chatCount, setChatCount] = useState<number>(0);
  useEffect(() => {
    if (chatCount === 6) {
      return;
    }
    const Timer = setInterval(() => setChatCount(chatCount + 1), 800);
    return () => clearInterval(Timer);
  }, [chatCount]);
  return (
    <IntroChatFieldBox>
      {chatCount >= 0 && <MyChat>오늘 점심 뭐먹을래?</MyChat>}
      {chatCount >= 1 && <OtherChat isMain={true}>그냥 아무거나 ~</OtherChat>}
      {chatCount >= 2 && <MyChat>김치찌개 어때?</MyChat>}
      {chatCount >= 3 && <OtherChat isMain={true}>그건 좀....</OtherChat>}
      {chatCount >= 4 && <MyChat>그럼 쌀국수 ㄱㄱ?</MyChat>}
      {chatCount >= 5 && <OtherChat isMain={true}>어제 먹었는데...</OtherChat>}
      {chatCount >= 6 && (
        <MyChat>
          <>
            그럼 <b>답점너</b>로 정하자!!
          </>
        </MyChat>
      )}
    </IntroChatFieldBox>
  );
};

export default React.memo(IntroChatField);

const IntroChatFieldBox = styled.div`
  height: 343px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  article {
    display: flex;
    padding: 18px 15px 0;

    &:nth-child(odd) {
      align-self: flex-end;
    }
  }
`;
