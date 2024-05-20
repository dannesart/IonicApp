export enum RoutesName {
  login = "login",
  home = "",
  instructions = "instructions",
  main = home,
  profile = "profile",
  contracts = "contracts",
  invites = "invites",
  send = "send",
  recieve = "recieve",
  completeAccount = "complete-account",
  verifyPhone = "verify-phone",
  wallet = "wallet",
  contacts = "contacts",
  error = "error",
  onboarding = "onboarding",
}

export enum RouteGroups {
  auth = "auth",
  main = "main",
  root = "root",
  none = "none",
}

export interface IRoute {
  title: string;
  route: RoutesName;
  path: string;
  group: RouteGroups;
  private?: boolean;
  hideFooter?: boolean;
  showBack?: boolean;
  showTitle?: boolean;
}

export type Route = {
  [key in RoutesName]: IRoute;
};

export const Routes: Route = {
  [RoutesName.home]: {
    title: null,
    route: RoutesName.home,
    path: `/${RoutesName.home}`,
    group: RouteGroups.root,
    private: true,
  },
  [RoutesName.login]: {
    title: null,
    route: RoutesName.login,
    path: `/${RoutesName.login}`,
    group: RouteGroups.auth,
  },
  [RoutesName.instructions]: {
    title: null,
    route: RoutesName.instructions,
    path: `/${RoutesName.instructions}`,
    group: RouteGroups.main,
    hideFooter: true,
  },
  [RoutesName.profile]: {
    title: "Profile",
    route: RoutesName.profile,
    path: `/${RoutesName.profile}`,
    private: true,
    group: RouteGroups.main,
  },
  [RoutesName.contacts]: {
    title: "Contacts",
    route: RoutesName.contacts,
    path: `/${RoutesName.contacts}`,
    private: true,
    group: RouteGroups.main,
  },
  [RoutesName.main]: {
    title: null,
    route: RoutesName.main,
    path: `/${RoutesName.main}`,
    private: true,
    group: RouteGroups.none,
  },
  [RoutesName.invites]: {
    title: null,
    route: RoutesName.invites,
    path: `/${RoutesName.invites}`,
    private: true,
    group: RouteGroups.main,
  },
  [RoutesName.completeAccount]: {
    title: "Sign up",
    route: RoutesName.completeAccount,
    path: `/${RoutesName.completeAccount}`,
    group: RouteGroups.auth,
  },
  [RoutesName.onboarding]: {
    title: null,
    route: RoutesName.onboarding,
    path: `/${RoutesName.onboarding}`,
    group: RouteGroups.main,
    private: true,
    hideFooter: true,
  },
  [RoutesName.wallet]: {
    title: "Wallet",
    route: RoutesName.wallet,
    path: `/${RoutesName.wallet}`,
    private: true,
    group: RouteGroups.main,
  },
  [RoutesName.verifyPhone]: {
    title: "Verify",
    route: RoutesName.verifyPhone,
    path: `/${RoutesName.verifyPhone}`,
    private: true,
    group: RouteGroups.auth,
  },
  [RoutesName.contracts]: {
    title: "Contracts",
    route: RoutesName.contracts,
    path: `/${RoutesName.contracts}`,
    group: RouteGroups.main,
  },
  [RoutesName.send]: {
    title: "Send",
    route: RoutesName.send,
    path: `/${RoutesName.send}`,
    group: RouteGroups.main,
    hideFooter: true,
    showBack: true,
    showTitle: true,
  },
  [RoutesName.recieve]: {
    title: "Recieve",
    route: RoutesName.recieve,
    path: `/${RoutesName.recieve}`,
    group: RouteGroups.main,
    hideFooter: true,
    showBack: true,
    showTitle: true,
  },
  [RoutesName.error]: {
    title: null,
    route: RoutesName.error,
    path: `/${RoutesName.error}`,
    group: RouteGroups.main,
  },
};

export const getRoute = (route: RoutesName) => {
  return Routes[route];
};
