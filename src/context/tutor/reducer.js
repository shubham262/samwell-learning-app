import { message } from "antd";
import { intialState } from "./state";
const actionHandlers = {
  FETCH_QUESTIONS_SUCCESS: (state, action) => ({
    ...state,
    ...action?.payload,
  }),
  UPDATE_STATE_VALUE: (state, action) => ({
    ...state,
    ...action?.payload,
  }),

  RESET_STATE: () => intialState,
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
