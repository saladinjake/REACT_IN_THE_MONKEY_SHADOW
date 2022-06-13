import { useEffect, useState } from "react";
import cookie from "utils/cookie";
import http from "utils/http";
import usePageReady from "./usePageReady";

const useAuth = () => {
  const ready = usePageReady();

  // the `current-user` State is `loading` before `componentDidMount`
  const [currentUser, setCurrentUser] = useState("loading");

  // This code could run on the `Server` as well
  // Make sure this code is running on the `Browser`
  const isLoadedOnBrowser = typeof window !== "undefined";

  // get the current-user from the `localStorage`
  const getCurrentUserInStorage = () => {
    if (isLoadedOnBrowser) {
      const userInStorage = window.localStorage.getItem("currentUser");

      const currentUser =
        userInStorage && userInStorage !== "undefined"
          ? JSON.parse(userInStorage)
          : null;

      return currentUser;
    }
  };

  const userInStorage = getCurrentUserInStorage();

  /**
   *  Set current-user to state on `component-mount`
   * To truly make sure the component using this hook has mounted on the Client side
   * We cannot just use the `userInStorage`
   */
  useEffect(() => {
    setCurrentUser(userInStorage);
  }, []);

  /**
   * Saves the `userDetails` to localStorage.
   *
   * Only works if? there's a `token` in cookie and there's no `userDetails` in localStorage
   * @param {boolean} force - flags a force to persist
   */
  const persistUserToClient = async (force) => {
    if (isLoadedOnBrowser) {
      const userInStorage = window.localStorage.getItem("currentUser");
      const isFreshSignin =
        cookie.getToken() && (!userInStorage || userInStorage === "undefined");

      if (isFreshSignin || force) {
        console.log("persistUserToClient is running...");

        try {
          // Fetch the current-user GET `/me`
          const {
            data: { data },
          } = await http.get("/me");

          // persist to the localStorage
          window.localStorage.setItem("currentUser", JSON.stringify(data));

          // Cause a Reload
          location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  /**
   * Remove `token` from cookie, and the `current-user` from localStorage
   */
  const removeUserFromClient = () => {
    // Remove Token from cookie
    cookie.removeToken();
    // Remove current-user from localStorage
    window.localStorage.removeItem("currentUser");
  };

  const signout = () => {
    if (isLoadedOnBrowser) {
      removeUserFromClient();

      // Cause a reload
      window.location.reload();
    }
  };

  // Handle expired token
  useEffect(() => {
    if (ready && !cookie.getToken()) {
      removeUserFromClient();
    }
  }, [ready]);

  const isAuthenticated =
    currentUser !== "loading" && currentUser ? true : false;
  const isLoading = currentUser === "loading" ? true : false;

  const fullName = isAuthenticated
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "";

  return {
    signout,
    persistUserToClient,
    currentUser,
    fullName,
    isAuthenticated,
    isLoading,
  };
};

export default useAuth;
