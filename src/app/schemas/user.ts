// TODO: Fix caps
export enum UserStatus {
  notcompleted = "notcompleted",
  unverified = "unverified",
  pendingVerification = "PENDING_VERIFICATION",
  verified = "verified",
  activated = "ACTIVATED",
  notloggedin = "notloggedin",
}

export interface User {
  firstName: string;
  lastName: string;
  status: UserStatus;
  refs: string[];
  id: string;
  email?: string;
  mobilePhone?: string;
}

export interface IContact {
  mobilePhone: string;
  firstName: string;
  lastName: string;
  favorite?: boolean;
  country: string;
}
