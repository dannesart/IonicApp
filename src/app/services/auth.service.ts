import { environment } from "@environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { RoutesName } from "@/enums/routes";
import { User } from "@/schemas/user";
import { Router } from "@angular/router";
import { AnalyticsService } from "./analyticts.service";

export interface AuthorizationCallback {
  status: "success" | "error";
  autoStartToken: string;
  orderRef: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    public router: Router,
    private http: HttpClient,
    private analytics: AnalyticsService
  ) {
    const token = this.getTokenFromStorage();
    if (token) {
      this._isLogedIn$.next(true);
    }
  }

  private _isLogedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _profileState$: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );
  public accountCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  /**
   * Phone auth
   */
  public async triggerPhoneAuth(phoneNumber: string) {
    try {
      const auth = await this.http
        .post<any>(
          `${environment.API.API_HOST}${environment.API.API_AUTH}/phone`,
          {
            phoneNumber,
          },
          {
            observe: "response",
            headers: {
              clientid: environment.API.CLIENT_ID,
            },
          }
        )
        .toPromise();
      return auth;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send verification code.
   */
  public async sendVerificationCode(
    code: string,
    phoneNumber: string
  ): Promise<any> {
    // const { id } = this._profileState$.value;
    const { body, headers } = await this.http
      .post<any>(
        `${environment.API.API_HOST}${environment.API.API_AUTH}/phone/validate`,
        {
          phoneNumber,
          otp: code,
        },
        {
          observe: "response",
          headers: {
            clientid: environment.API.CLIENT_ID,
          },
        }
      )
      .toPromise()
      .catch((error) => {
        return Promise.reject({
          status: "error",
          error,
        });
      });

    // Set token here.
    this.setTokenInStorage(body.access_token);
    this._isLogedIn$.next(true);
    if (body.peyyaUserId) {
      this.analytics.initPendo(body.peyyaUserId);
    }

    // Return as success promise object.
    return Promise.resolve({ ...body, headers });
  }

  // TODO: Logout method? Is it needed?
  // For now, in test
  public async logout(): Promise<boolean> {
    // Delete token.
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLogedIn$.next(false);
    this.router.navigateByUrl(RoutesName.login);
    return Promise.resolve(true);
  }

  /**
   * Token
   */
  private TOKEN_NAME = "auth-token";
  // Set token to storage.
  private setTokenInStorage = (token: string) => {
    if (token.toLowerCase().startsWith("bearer"))
      token = token.replace("bearer", "");

    localStorage.setItem(this.TOKEN_NAME, token);
  };
  // Get token from storage
  private getTokenFromStorage = () => {
    return localStorage.getItem(this.TOKEN_NAME);
  };
  // Validate any token.
  private validateToken = (token?: string) => {
    if (!token) {
      token = this.getTokenFromStorage();
    }
    if (token) {
      // TODO: validate token. Return true if ok, false if not.
      // Perhaps.
      return true;
    }
    return false;
  };

  public isAuthed$ = () => {
    return this._isLogedIn$.asObservable();
  };

  /**
   * Get profile state
   */
  public async getProfileState() {
    return this.getProfileStateAsObservable().toPromise();
  }
  public getToken = () => {
    return this.getTokenFromStorage();
  };
  public getProfileStateAsObservable() {
    // TODO: Get user info from auth token / or user endpoint.
    const token = this.getTokenFromStorage();
    return this._profileState$.asObservable();
    //return of({ id: "1", status: UserStatus.activated });
  }
  public setProfileState(user) {
    this._profileState$.next(user);
  }
}
