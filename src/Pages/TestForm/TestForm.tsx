import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
import styled from "styled-components";
import MyChat from "Components/MyChat";
import OtherChat from "Components/OtherChat";
import Button from "Components/Button";
import CategoryButtonForm from "./CategoryButtonForm";
import { questionList, answerList, categoryChatList } from "./testData";
import sub_logo from "assets/sub_logo.svg";

const TestForm = ({ history }) => {
  const [mouseAction, setMouseAction] = useState<boolean>(true);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [chatList, setChatList] = useState<string[] | any>([]);
  const [userResult, setUserResult] = useState<boolean[] | any>([]);

  // 진행도 증가 함수
  const increaseProgress = () => setQuestionCount(questionCount + 1);

  // 채팅 목록에 새로운 질문,답변 추가하는 함수
  const addChatList = (answer: string, category?: boolean): void => {
    setMouseAction(false);
    let newAnswer: string = `${answerList[questionCount - 2]} ${answer}`;
    if (category) {
      newAnswer = `${answer}`;
    }
    const newQuestion: string = questionList[questionCount - 1];
    setChatList([...chatList, [newAnswer]]);
    setTimeout(() => {
      setChatList([...chatList, [newAnswer, newQuestion]]);
      setMouseAction(true);
    }, 1200);
  };

  // 좋아/싫어 버튼 눌렀을 때 위의 로직들을 모두 실행
  const handleAnswerBtn = (
    answer: string,
    index: number = 0,
    type?: boolean
  ): void => {
    if (type !== undefined) {
      addChatList(answer);
      setUserResult([...userResult, type]);
    } else {
      addChatList(categoryChatList[index], true);
      setUserResult([...userResult, answer]);
    }
    increaseProgress();
  };

  const bottomRef = useRef();
  const scrollToBottom = (bottomRef) => {
    bottomRef.current!.scrollTop = bottomRef.current!.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom(bottomRef);
  }, [chatList]);

  const sendResultPage = async () => {
    try {
      // axios.post('api 주소', {
      // 	"test_data": userResult
      // });
      const location = {
        pathname: "/result",
        state: {
          chatList,
        },
      };
      history.push(location);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TestSection>
      {questionCount < 8 ? (
        <QuestionNav>
          <h1>Q{questionCount}</h1>
          <p>{questionCount}/7</p>
        </QuestionNav>
      ) : (
        <ResultNav>
          <img
            alt="go_home"
            src={sub_logo}
            onClick={() => history.push("/intro")}
          />
        </ResultNav>
      )}

      <ChatForm questionCount={questionCount} ref={bottomRef}>
        <ul id="chatForm-holder">
          <li>
            <OtherChat>종류는 뭘로 할래?</OtherChat>
          </li>
          {chatList.map((message, idx) => (
            <React.Fragment key={idx}>
              <li>
                <MyChat>{message[0]}</MyChat>
              </li>
              <li>
                <OtherChat isDelay={"1.15s"}>{message[1]}</OtherChat>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </ChatForm>

      <ButtonForm>
        <ul>
          {questionCount === 1 ? (
            <CategoryButtonForm
              mouseAction={mouseAction}
              handleAnswerBtn={handleAnswerBtn}
            />
          ) : questionCount < 8 ? (
            <>
              <li>
                <Button
                  color="gray-click"
                  mouseAction={mouseAction}
                  eventFunc={() => handleAnswerBtn("좋아!", undefined, true)}
                >
                  <div>좋아</div>
                </Button>
              </li>
              <li>
                <Button
                  color="gray-click"
                  mouseAction={mouseAction}
                  eventFunc={() => handleAnswerBtn("싫어!", undefined, false)}
                >
                  <div>싫어</div>
                </Button>
              </li>
            </>
          ) : (
            <Button
              color="yellow"
              mouseAction={mouseAction}
              eventFunc={sendResultPage}
            >
              <div>결과 보러 가기</div>
            </Button>
          )}
        </ul>
      </ButtonForm>
    </TestSection>
  );
};

export default TestForm;

const TestSection = styled.section`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

const QuestionNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  min-height: 7.375em;
  padding: 2.25em 2em 1em;

  h1 {
    font-family: ${({ theme }) => theme.questionFont};
    font-size: 2.5em;
    color: ${({ theme }) => theme.mainOrange};
  }

  p {
    font-family: ${({ theme }) => theme.mainFontBold};
    font-size: 0.875em;
    color: ${({ theme }) => theme.progressGray};
  }
`;

const ResultNav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 3.25em 2em 2.25em;
  min-height: 7.375em;
  cursor: pointer;

  img {
    width: 4.75em;
  }
`;

const ChatForm = styled.div`
  height: ${({ questionCount }) => (questionCount === 1 ? "12.188em" : "30em")};
  margin: 1.25em;
  padding: 2.625em 0;
  border-radius: 1.875em;
  background-color: ${({ theme }) => theme.lightGray};
  overflow: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    max-height: 27em;

    li {
      display: flex;
      padding: 0 1em 1.375em;

      &:nth-of-type(even) {
        align-self: flex-end;
      }
    }
  }
`;

const ButtonForm = styled.div`
  button {
    padding: 1.5em 0;
  }

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1.25em;

    li {
      width: 48.5%;
      margin-bottom: 1.25em;

      &:nth-of-type(7) {
        width: 100%;
      }

      button {
        padding: 1.5em 0;
      }
    }
  }
`;
