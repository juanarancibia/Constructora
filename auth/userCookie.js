import cookies from "js-cookie";

export const getUserFromCookie = () => {
  const cookie = cookies.get("__session");
  if (!cookie) {
    return;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = (user) => {
  cookies.set("__session", JSON.stringify(user), {
    expires: 1 / 24,
  });
};

export const removeUserCookie = () => cookies.remove("__session");
