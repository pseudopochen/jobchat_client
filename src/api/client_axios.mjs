import {reqRegister, reqLogin, reqUpdateUser, reqDeleteUser, reqUser} from './index.js'

// import axios from "axios";
// import ajax from './ajax.js'

// const BASE_URL = "http://localhost:5000";

// function ajax(url, data = {}, type = "GET") {
//   if (type === "GET") {
//     return axios.get(url, { params: data });
//   } else {
//     return axios.post(url, data);
//   }
// }

// POST register

//const reqRegister = (user) => ajax(BASE_URL + "/register", user, "POST");

let result = await reqRegister({
  username: "admin",
  password: "admin",
  type: "manager",
});
//.then((res) => {
//  console.log("res.data: ", res.data);
//})
//.catch((e) => console.log("error: ", e));

console.log("register result: ", result);

// POST login

// const reqLogin = (username, password) =>
//   ajax(BASE_URL + "/login", { username, password }, "POST");

result = await reqLogin({...result.data, password: 'admin'});
console.log("login result:", result);

// POST update

// const reqUpdateUser = (user) => ajax(BASE_URL + "/updateUser", user, "POST");

const user = result.data;
user.type = "applicant";
user.avatar = "avatar01.png";
result = await reqUpdateUser(user);
console.log("update result:", result);

// POST delete

const userID = result.data._id;
console.log(userID);

// const reqDeleteUser = (userID) =>
//   ajax(BASE_URL + "/deleteUser", { userID }, "POST");

result = await reqDeleteUser(userID);
console.log('delete result: ', result);

// GET user by id stored in cookie, !!! do not work, because cookies are stored in brower, only reqests made by browser has cookies in there.

// const result1 = await reqUser()
// console.log('get user by id in cookie: ', result1)