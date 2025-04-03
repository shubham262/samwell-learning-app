"use client";
import { useMemo } from "react";
import { TutorState } from "./tutor/state";

const useCombineState = () => {
  // Call all hooks at the top level
  const tutorInfo = TutorState();

  // Only memoize the final combined object
  return useMemo(
    () => ({
      tutorInfo,
    }),
    [tutorInfo]
  );
};

export default useCombineState;
