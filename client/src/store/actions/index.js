import axios from "axios";

export const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS";
export const GET_FRIENDS_ERROR = "GET_FRIENDS_ERROR";
export const HANDLE_CHANGE = "HANDLE_CHANGE";
export const HANDLE_SLIDER_VALUE = "HANDLE_SLIDER_VALUE";
export const FIELDS_REQUIRED = "FIELDS_REQUIRED";
export const AGE_NOT_NUMBER = "AGE_NOT_NUMBER";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_ERROR = "ADD_FRIEND_ERROR";
export const HANDLE_CLOSE = "HANDLE_CLOSE";
export const DELETE_FRIEND_SUCCESS = "DELETE_FRIEND_SUCCESS";
export const DELETE_FRIEND_ERROR = "DELETE_FRIEND_ERROR";
export const HANDLE_UPDATE = "HANDLE_UPDATE";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const getFriends = () => dispatch => {
  axios
    .get(`http://localhost:5000/api/friends`)
    .then(res => dispatch({ type: GET_FRIENDS_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_FRIENDS_ERROR, payload: error }));
};

export const handleChange = e => {
  return {
    type: HANDLE_CHANGE,
    e
  };
};

export const handleSliderValue = (e, value) => {
  return {
    type: HANDLE_SLIDER_VALUE,
    payload: value
  };
};

export const addFriend = (name, age, email, sliderValue) => dispatch => {
  if (!name || !age || !email) {
    dispatch({ type: FIELDS_REQUIRED });
  } else if (isNaN(age)) {
    dispatch({ type: AGE_NOT_NUMBER });
  } else {
    axios
      .post(`http://localhost:5000/api/friends`, {
        email,
        age,
        name,
        like: sliderValue
      })
      .then(res => dispatch({ type: ADD_FRIEND_SUCCESS, payload: res.data }))
      .catch(error => dispatch({ type: ADD_FRIEND_ERROR }));
  }
};

export const handleClose = (e, reason) => {
  return {
    type: HANDLE_CLOSE,
    payload: reason
  };
};

export const handleDelete = id => dispatch => {
  axios
    .delete(`http://localhost:5000/api/friends/${id}`)
    .then(res =>
      dispatch({ type: DELETE_FRIEND_SUCCESS, payload: { id, res: res.data } })
    )
    .catch(error => dispatch({ type: DELETE_FRIEND_ERROR }));
};

export const handleUpdate = (id, email, age, name, sliderValue) => {
  return {
    type: HANDLE_UPDATE,
    payload: {
      id,
      email,
      age,
      name,
      sliderValue
    }
  };
};

export const submitUpdate = (id, email, age, name, like) => dispatch => {
  axios
    .put(`http://localhost:5000/api/friends/${id}`, {
      email,
      age,
      name,
      like
    })
    .then(res => dispatch({ type: UPDATE_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: UPDATE_ERROR }));
};
