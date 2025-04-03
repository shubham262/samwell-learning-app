"use client";
import { useReducer } from "react";
import Reducer from "./reducer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "@/helpers";
import { Actions } from "./action";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
export const intialState = {
  questionsData: null,
  userQuery: "",
};

export const TutorState = () => {
  const [state, dispatch] = useReducer(Reducer, intialState);

  const fetchQuestions = async (userQuery) => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      const result = await model.generateContent(generatePrompt(userQuery));
      const response = await result.response;
      const extractedJson =
        response?.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanedJson = extractedJson?.replace(/```json|```/g, "")?.trim();
      const parsedJson = JSON.parse(cleanedJson);
      const payload = {
        questionsData: parsedJson,
        userQuery,
      };
      console.log(payload);
      dispatch({
        type: Actions.FETCH_QUESTIONS_SUCCESS,
        payload: payload,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateStateValue = (payload) => {
    dispatch({ type: Actions.UPDATE_STATE_VALUE, payload });
  };

  return {
    ...state,
    fetchQuestions,
    updateStateValue,
  };
};
