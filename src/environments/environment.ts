// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API = {
  API_HOST: "http://localhost:5002/v1", //"http://localhost:5002/v1", //"https://api.peyya.io/v1", // "http://localhost:5002/v1"
  API_AUTH: "/authorize",
  API_USERS: "/users",
  API_USER_CREATE: "/users/create",
  API_USER_VALIDATE: "/users/validate",
  API_USER_GET: "/users/get",
  API_WALLET: "/wallet",
  API_TRANSACTIONS: "/transactions",
  CLIENT_ID: "02c5ed6a-5d54-4efb-868e-97a1c2458f42",
  CLIENT_SECRET: "3851a20a-ad7e-4e62-be52-d3d4929e1647",
};

export const environment: { production: boolean; API: any } = {
  production: false,
  API,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
