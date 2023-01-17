import {
  ADD_SYMPTOMS_REQUEST,
  ADD_SYMPTOMS_SUCCESS,
  ADD_SYMPTOMS_ERROR,
  UPDATE_SYMPTOMS_REQUEST,
  UPDATE_SYMPTOMS_SUCCESS,
  UPDATE_SYMPTOMS_ERROR,
} from "../actions";

const INIT_STATE = {
  error: null,
  isLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_SYMPTOMS_REQUEST:
    case UPDATE_SYMPTOMS_REQUEST:
      return { ...state, isLoading: true, error: "" };
    case ADD_SYMPTOMS_SUCCESS:
    case UPDATE_SYMPTOMS_SUCCESS:
      return { ...state, isLoading: false, error: "" };
    case ADD_SYMPTOMS_ERROR:
    case UPDATE_SYMPTOMS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
