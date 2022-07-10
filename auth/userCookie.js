import cookies from "js-cookie";

export const getUserFromCookie = () => {
  const cookie = window.localStorage.getItem("auth");
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = (user) => {
  window.localStorage.setItem("auth", JSON.stringify(user));
};

export const removeUserCookie = () => cookies.remove("__session");
