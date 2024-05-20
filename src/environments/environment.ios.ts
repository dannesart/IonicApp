const API = {
  API_HOST: "https://api.peyya.io/v1", //  "https://api.peyya.io/v1", "http://localhost:5000/v1"
  API_AUTH: "/authorize",
  API_USERS: "/users",
  API_USER_CREATE: "/users/create",
  API_USER_VALIDATE: "/users/validate",
  API_USER_GET: "/users/get",
  API_WALLET: "/wallet",
  API_TRANSACTIONS: "/transactions",
  CLIENT_ID: "02c5ed6a-5d54-4efb-868e-97a1c2458f42",
};

import config from "../../capacitor.config.json";

export const environment: { production: boolean; API: any } = {
  production: true,
  API,
};
