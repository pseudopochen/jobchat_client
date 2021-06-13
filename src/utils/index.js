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
