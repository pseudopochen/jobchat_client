import { reqRegister, reqLogin } from "../api";
import { AUTH_SUCCESS, ERROR_MSG } from "./action-types";

const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });

export const register = (user) => {
  const { username, password, password2 } = user;
  if (password2 !== password) {
    return errorMsg("password confirmation inconsistent!");
  } else if (!username) {
    return errorMsg("username is required!");
  } else if (!password) {
    return errorMsg("password is required!");
  }

  return async (dispatch) => {
    const result = await reqRegister(user);
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const login = (user) => {
  const { username, password } = user;
  if (!username) {
    return errorMsg("username is required!");
  } else if (!password) {
    return errorMsg("password is required!");
  }

  return async (dispatch) => {
    const result = await reqLogin(user);
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};
