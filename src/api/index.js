import ajax from "./ajax.js";

const BASE_URL = ""; //"http://localhost:5000"; // only for testing using client_axios.mjs

// register (add user)
export const reqRegister = (user) => ajax(BASE_URL + "/register", user, "POST");

// login (query user)
export const reqLogin = (user) => ajax(BASE_URL + "/login", user, "POST");

// delete user
export const reqDeleteUser = (userID) =>
  ajax(BASE_URL + "/deleteUser", { userID }, "POST");

// update user
export const reqUpdateUser = (user) =>
  ajax(BASE_URL + "/updateUser", user, "POST");

// get user by id
export const reqUser = () => ajax(BASE_URL + "/user");

// get user list by type
export const reqUserList = (type) => ajax(BASE_URL + "/userlist", { type });

// get message list
export const reqChatMsgList = () => ajax("/msglist");

// change message status to read: true
export const reqReadMsg = (from) => ajax("/readmsg", { from }, "POST");
