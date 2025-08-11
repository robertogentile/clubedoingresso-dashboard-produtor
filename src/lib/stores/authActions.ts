export const authActions = {
  // Não armazenar tokens no cliente - apenas em cookies httpOnly
  setTokens: () => {
    if (typeof window === "undefined") return;
    // Tokens são gerenciados apenas via server actions e cookies httpOnly
    console.log("Tokens should be managed via server actions only");
  },

  clearTokens: () => {
    if (typeof window === "undefined") return;
    // Limpeza será feita via server action logout
    console.log("Token cleanup should be done via server action");
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
