import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root",
})
export class KycService implements OnInit {
  public save = async (firstName, lastName) => {
    try {
      const response = await this.http
        .post<any>(
          `${environment.API.API_HOST}${environment.API.API_USERS}/kyc`,
          {
            firstName,
            lastName,
          }
        )
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  };

  async ngOnInit() {}

  constructor(public http: HttpClient) {}
}
