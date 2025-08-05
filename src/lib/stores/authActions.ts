export const authActions = {
  setTokens: (accessToken: string, refreshToken: string) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("auth-token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);

    const isSecure = window.location.protocol === "https:";
    const secureFlag = isSecure ? "; Secure" : "";
    document.cookie = `auth-token=${accessToken}; path=/; SameSite=Strict${secureFlag}; Max-Age=3600`;
  },

  clearTokens: () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("auth-token");
    localStorage.removeItem("refresh-token");
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },

  broadcastLogin: () => {
    if (typeof window === "undefined") return;

    const bc = new BroadcastChannel("auth");
    bc.postMessage({ type: "login" });
    bc.close();
  },

  broadcastLogout: () => {
    if (typeof window === "undefined") return;

    const bc = new BroadcastChannel("auth");
    bc.postMessage({ type: "logout" });
    bc.close();
  },
};
