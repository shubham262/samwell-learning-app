"use client";
import { useReducer } from "react";
import Reducer from "./reducer";

export const intialState = {
  fetchedQuestions: null,
  num: 3000,
};

export const TutorState = (props) => {
  const [state, dispatch] = useReducer(Reducer, intialState);

  return {
    ...state,
  };
};
