import Manager from "../containers/manager/manager";
import Applicant from "../containers/applicant/applicant";
import Message from "../containers/message/message";
import Personal from "../containers/personal/personal";

export function getRedirectTo(type, avatar) {
  let path;
  if (type === "manager") {
    path = "/manager";
  } else {
    path = "/applicant";
  }
  if (!avatar) {
    path += "info";
  }
  return path;
}

export const navList = [
  {
    path: "/manager",
    component: Manager,
    title: "Applicant List",
    icon: "applicant",
    text: "applicant",
  },
  {
    path: "/applicant",
    component: Applicant,
    title: "Manager List",
    icon: "manager",
    text: "manager",
  },
  {
    path: "/message",
    component: Message,
    title: "Message List",
    icon: "message",
    text: "message",
  },
  {
    path: "/personal",
    component: Personal,
    title: "User Center",
    icon: "personal",
    text: "personal",
  },
];

export function getNavList(userType = "") {
  if (!userType) {
    return navList;
  }
  if (userType === "manager") {
    return [navList[0], ...navList.slice(2)];
  }
  return navList.slice(1);
};

export function inNavList(path) {
  return navList.find((nav) => nav.path === path);
};

