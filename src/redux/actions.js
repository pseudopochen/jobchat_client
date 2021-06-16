import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
} from "./action-types";
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
} from "../api";

// auth success sync action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });

// error msg sync action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });

// receive user sync action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });

// reset user sync action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });

// get user list sync action
const receiveUserList = (userList) => ({
  type: RECEIVE_USER_LIST,
  data: userList,
});

// register user async action
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

// login async action
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

// update user async action
export const updateUser = (user) => {
  return async (dispatch) => {
    const result = await reqUpdateUser(user);
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

// get user from userid in cookie async action
export const getUser = () => {
  return async (dispatch) => {
    const result = await reqUser();
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

// get user list aysnc action
export const getUserList = (type) => {
  return async (dispatch) => {
    const result = await reqUserList(type);
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};

// send message to server async action
export const clientToServer = ({from, to, content}) => {
  return async (dispatch) => {
    console.log(from, to, content)
  }
}
