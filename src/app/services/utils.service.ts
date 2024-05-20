import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor() {}

  public fullNameToShort = (firstName: string, lastName: string) => {
    const firstLetter = firstName ? firstName.charAt(0) : null;
    const lastLetter = lastName ? lastName.charAt(0) : null;
    return [firstLetter, lastLetter].join("").replace(/ /g, "");
  };
}
