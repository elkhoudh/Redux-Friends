import {
  GET_FRIENDS_SUCCESS,
  HANDLE_CHANGE,
  GET_FRIENDS_ERROR,
  HANDLE_SLIDER_VALUE,
  FIELDS_REQUIRED,
  AGE_NOT_NUMBER,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_ERROR,
  HANDLE_CLOSE,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_ERROR,
  HANDLE_UPDATE,
  UPDATE_ERROR,
  UPDATE_SUCCESS
} from "../actions/index";

const initialState = {
  friends: [],
  error: "",
  name: "",
  age: "",
  email: "",
  updatingId: "",
  updating: false,
  open: false,
  message: "New Friend Added",
  variant: "success",
  sliderValue: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload
      };

    case GET_FRIENDS_ERROR:
      return {
        ...state,
        message: "Failed to get friends",
        variant: "error"
      };

    case HANDLE_CHANGE:
      action.e.persist();
      return {
        ...state,
        [action.e.target.name]: action.e.target.value
      };

    case HANDLE_SLIDER_VALUE:
      return {
        ...state,
        sliderValue: action.payload
      };

    case FIELDS_REQUIRED:
      return {
        ...state,
        message: "ALL FIELDS REQUIRED",
        variant: "error",
        open: true
      };

    case AGE_NOT_NUMBER:
      return {
        ...state,
        message: "AGE IS NOT A NUMBER",
        variant: "error",
        open: true
      };

    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friends: action.payload,
        message: "NEW FRIEND ADDED",
        variant: "success",
        open: true,
        email: "",
        age: "",
        name: "",
        updatingId: "",
        sliderValue: 0
      };

    case ADD_FRIEND_ERROR:
      return {
        ...state,
        open: true,
        message: "Error saving friend",
        variant: "error"
      };

    case HANDLE_CLOSE:
      return {
        ...state,
        open: false
      };

    case DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        friends: action.payload.res,
        open: true,
        message: `User with ID ${action.payload.id} was delted`,
        variant: "success"
      };
    case DELETE_FRIEND_ERROR:
      return {
        ...state,
        open: true,
        message: "ERROR DELETING FRIEND",
        variant: "error"
      };

    case HANDLE_UPDATE:
      return {
        ...state,
        email: action.payload.email,
        age: action.payload.age,
        updating: true,
        updatingId: action.payload.id,
        message: `UPDATING ${action.payload.name}`,
        open: true,
        variant: "success",
        sliderValue: action.payload.sliderValue,
        name: action.payload.name
      };

    case UPDATE_ERROR:
      return {
        ...state,
        open: true,
        variant: "error",
        message: "ERROR UPDATING FRIEND"
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        friends: action.payload,
        email: "",
        age: "",
        name: "",
        updatingId: "",
        updating: false,
        message: "FRIEND HAS BEEN UPDATED",
        open: true,
        sliderValue: 0
      };

    default:
      return state;
  }
};

export default reducer;
