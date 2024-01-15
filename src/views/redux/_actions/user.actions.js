import { Constants } from "../_constants/constants";

export const setUserIdRedux = (userId) => {
  return {
    type: Constants.SET_USER_ID,
    payload: userId,
  };
};

export const setNameUserRedux = (name) => {
  return {
    type: Constants.SET_NAME_USER,
    payload: name,
  };
};