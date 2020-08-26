import React from "react";
import Button from "Components/Button";
import { categoryList } from "./testData";

type categoryProps = {
  mouseAction: boolean;
  handleAnswerBtn: (answer: string, index: number, type?: boolean) => void;
};

const CategoryButtonForm = ({
  mouseAction,
  handleAnswerBtn,
}: categoryProps) => {
  return (
    <>
      {categoryList.map((category, idx) => {
        return (
          <li key={idx}>
            <Button
              color="gray-click"
              mouseAction={mouseAction}
              eventFunc={() => handleAnswerBtn(category, idx)}
            >
              <div>{category}</div>
            </Button>
          </li>
        );
      })}
    </>
  );
};

export default CategoryButtonForm;
