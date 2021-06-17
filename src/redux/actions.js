import io from "socket.io-client";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ,
} from "./action-types";
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg,
} from "../api";

// create a singleton socket and store it inside io
function initIO(dispatch, userid) {
  if (!io.socket) {
    io.socket = io("ws://localhost:5000");
    io.socket.on("serverToClient", function (chatMsg) {
      console.log("serverToClient: ", chatMsg);
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg({ chatMsg, userid }));
      }
    });
  }
}

// get message list async action
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid);
  const result = await reqChatMsgList();
  if (result.code === 0) {
    const { users, chatMsgs } = result.data;
    dispatch(receiveMsgList({ users, chatMsgs, userid }));
  }
}

// send message from client to server async action
export const clientToServer = ({ from, to, content }) => {
  return async (dispatch) => {
    console.log(from, to, content);
    // initIO();
    io.socket.emit("clientToServer", { from, to, content });
  };
};

// read message async action
export const readMsg = (from, to) => {
  return async (dispatch) => {
    const result = await reqReadMsg(from);
    if (result.code === 0) {
      const count = result.data;
      dispatch(msgRead({ count, from, to }));
    }
  };
};

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

// receive message list sync
const receiveMsgList = ({ users, chatMsgs, userid }) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs, userid },
});

// receive on message sync
const receiveMsg = ({ chatMsg, userid }) => ({
  type: RECEIVE_MSG,
  data: { chatMsg, userid },
});

// read message sync
const msgRead = ({ count, from, to }) => ({
  type: MSG_READ,
  data: { count, from, to },
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
      getMsgList(dispatch, result.data._id);
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
      getMsgList(dispatch, result.data._id);
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
      getMsgList(dispatch, result.data._id);
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
