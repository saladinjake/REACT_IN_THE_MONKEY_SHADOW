// This code could run on the `Server` as well
// Make sure this code is running on the `Browser`
const isLoadedOnBrowser = typeof document !== "undefined";

const cookie = {
  /**
   * Gets the `token` from the cookie
   */
  getToken() {
    if (isLoadedOnBrowser) {
      const cookie = document.cookie;
      const cookies = cookie.split(";");

      const token = cookies
        .find((c) => c.includes("token"))
        ?.replace("token=", "")
        ?.trim();

      return token;
    }
  },

  /**
   * Sets the provided `token` in `cookie`
   * @param {string} token
   */
  setToken(token) {
    if (isLoadedOnBrowser) {
      const days = 10;
      const now = new Date();
      now.setTime(now.getTime() + days * (60 * 24) * 60 * 1000);
      const expires = now.toUTCString();

      const cookie = `token=${token}; expires=${expires};`;
      document.cookie = cookie;

      this.getToken();
    }
  },

  /**
   * Remove the `token` from `cookie`
   */
  removeToken() {
    if (isLoadedOnBrowser) {
      document.cookie = "token=;";
    }
  },
};

export default cookie;
