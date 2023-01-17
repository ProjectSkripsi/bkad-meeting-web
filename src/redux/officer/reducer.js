import {
  ADD_NEW_OFFICER_REQUEST,
  ADD_NEW_OFFICER_SUCCESS,
  ADD_NEW_OFFICER_ERROR,
  DELETE_OFFICER_REQUEST,
  DELETE_OFFICER_SUCCESS,
  DELETE_OFFICER_ERROR,
  UPDATE_OFFICER_REQUEST,
  UPDATE_OFFICER_SUCCESS,
  UPDATE_OFFICER_ERROR,
} from "../actions";

const INIT_STATE = {
  error: null,
  isLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_OFFICER_REQUEST:
    case DELETE_OFFICER_REQUEST:
    case UPDATE_OFFICER_REQUEST:
      return { ...state, isLoading: true, error: "" };
    case ADD_NEW_OFFICER_SUCCESS:
    case DELETE_OFFICER_SUCCESS:
    case UPDATE_OFFICER_SUCCESS:
      return { ...state, isLoading: false, error: "" };
    case ADD_NEW_OFFICER_ERROR:
    case DELETE_OFFICER_ERROR:
    case UPDATE_OFFICER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
