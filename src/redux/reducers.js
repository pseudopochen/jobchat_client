import { combineReducers } from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
} from "./action-types";

import { getRedirectTo } from "../utils/index";

const initUser = {
  username: "",
  type: "",
  msg: "",
  redirectTo: "",
};

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { type, avatar } = action.data;
      return { ...action.data, redirectTo: getRedirectTo(type, avatar) };
    case ERROR_MSG:
      return { ...state, msg: action.data };
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return { ...initUser, msg: action.data };
    default:
      return state;
  }
}

const initUserList = [];

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0,
};

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { users, chatMsgs } = action.data;
      return { users, chatMsgs, unReadCount: 0 };
    case RECEIVE_MSG:
      const chatMsg = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: 0,
      };
    default:
      return state;
  }
}

export default combineReducers({ user, userList, chat });
