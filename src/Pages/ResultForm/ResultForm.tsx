import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import MyChat from "Components/MyChat";
import OtherChat from "Components/OtherChat";
import Button from "Components/Button";
import sub_logo from "assets/sub_logo.svg";

const ResultForm = ({ history }) => {
  const chatListState = history.location.state.chatList;
  const [mouseAction, setMouseAction] = useState<boolean>(true);
  const [chatList, setChatList] = useState<string[] | any>([]);
  type Food = { food_name: string; img?: string; match?: number };
  const [foodResult, setFoodResult] = useState<Food[]>([]);
  const [resultView, setResultView] = useState<number>(0);

  console.log("foodResult : ", foodResult);
  console.log("resultView : ", resultView);

  const getFoodResult = async () => {
    try {
      // const res = await axios.get(`API 주소`);
      const res = await axios.get(`http://localhost:3000/data/resultData.json`);
      console.log(res.data.result);
      setFoodResult(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoodResult();
    setChatList(chatListState);
  }, [chatList, chatListState]);

  // useEffect(() => {
  //   console.log("chatList : ", chatList);
  // }, [chatList, history.location.state.chatList]);

  const filteredFoodList = foodResult.filter((_, idx) => idx < resultView + 1);

  useEffect(() => {
    console.log("filteredFoodList: ", filteredFoodList);
  }, [filteredFoodList]);

  const bottomRef = useRef(null);
  const scrollToBottom = (bottomRef) => {
    console.log(bottomRef.current.scrollTop, bottomRef.current.scrollHeight);
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom(bottomRef);
  }, [foodResult]);

  return (
    <ResultSection>
      <ResultNav>
        <img
          alt="go_home"
          src={sub_logo}
          onClick={() => history.push("/intro")}
        />
      </ResultNav>

      <ChatForm ref={bottomRef}>
        <ul className="oldChat">
          <li>
            <OtherChat>종류는 뭘로 할래?</OtherChat>
          </li>
          {chatList.map((message, idx) => (
            <React.Fragment key={idx}>
              <li>
                <MyChat>{message[0]}</MyChat>
              </li>
              <li>
                <OtherChat>{message[1]}</OtherChat>
              </li>
            </React.Fragment>
          ))}
          {filteredFoodList.map((food, idx) => (
            <React.Fragment key={idx}>
              <li className="alignLeft">
                <OtherChat>
                  그럼 오늘 점심으로{" "}
                  <span className="pointText">{food.food_name}</span> 어때?
                </OtherChat>
              </li>
              <li className="alignLeft foodImgChat">
                <OtherChat isDelay={"1.15s"}>
                  {/* <img
										className='foodImg'
										alt={food.food_name}
										src='https://live.staticflickr.com/5330/17596608736_cb23e9917d_w.jpg'
									/> */}
                  사진
                </OtherChat>
              </li>
              <li className="alignLeft">
                <OtherChat isDelay={"2.3s"}>
                  네가 말해준 조건과 <span className="pointText">75%</span>{" "}
                  일치해!
                </OtherChat>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </ChatForm>

      <ButtonForm>
        <ul>
          <li>
            <Button
              color="yellow"
              mouseAction={mouseAction}
              eventFunc={() => console.log(filteredFoodList[0].food_name)}
            >
              <div>
                오늘 점심은
                <br />
                <b>
                  {foodResult.length > 1 &&
                    filteredFoodList[resultView].food_name}
                </b>
                !!
              </div>
            </Button>
          </li>
          <li>
            <Button
              color="gray"
              mouseAction={mouseAction}
              eventFunc={() => console.log("NO")}
            >
              <div>
                <b>다른 메뉴</b>는
                <br />
                없어?
              </div>
            </Button>
          </li>
        </ul>
      </ButtonForm>
    </ResultSection>
  );
};

export default ResultForm;

const ResultSection = styled.section`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;

  .pointText {
    font-family: ${({ theme }) => theme.mainFontBold};
    color: ${({ theme }) => theme.mainOrange};
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
  height: 30em;
  margin: 1.25em;
  padding: 1.25em 0;
  border-radius: 1.875em;
  background-color: ${({ theme }) => theme.lightGray};
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      padding: 1.375em 1em 0;

      &:nth-of-type(even) {
        align-self: flex-end;
      }

      &.alignLeft {
        align-self: flex-start;
      }

      /* &.foodImgChat {
				position: relative;

				img {
					width: auto;
					height: 200px;

					&.foodImg {
						position: absolute;
						left: 70px;
						width: 300px;
						height: auto;
					}
				}
			} */
    }

    &.oldChat article {
      animation: none;
    }
  }
`;

const ButtonForm = styled.div`
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 1.25em;

    li {
      width: 48.5%;
      margin-bottom: 1.25em;

      button {
        min-height: 30%;
        padding: 0.9em 0;
      }
    }
  }
`;
