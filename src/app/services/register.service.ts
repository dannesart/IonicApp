import { UsersService } from "@/services/users.service";
import { AuthService } from "@/services/auth.service";
import { BehaviorSubject } from "rxjs";
import { User, UserStatus } from "@/schemas/user";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";

enum RegisterResponseStatus {
  error = "error",
  success = "success",
  successNoAccount = "successNoAccount",
}

export enum RegisterStates {
  loading = "loading",
  init = "init",
  prefilled = "prefilled",
  authenticates = "authenticates",
  error = "error",
  success = "success", // Temp
  successNoAccount = "successNoAccount",
}

export enum RegisterErrors {
  authorizationInit = "authorizationInit",
  authorizationOrderRef = "authorizationOrderRef",
}

interface RegisterState {
  name: RegisterStates;
}

interface SuccessfulRegistrationResponse {
  user: User;
}

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  public state$: BehaviorSubject<RegisterState> = new BehaviorSubject<RegisterState>(
    {
      name: RegisterStates.init,
    }
  );

  public async registerNewUser(user: User): Promise<User | string> {
    /**
     * Check registration status.
     */
    if (this.state$.getValue().name !== RegisterStates.loading) {
      try {
        this.state$.next({
          name: RegisterStates.loading,
        });
        // Do async await request to API.
        const userResponse = await this.http
          .patch<User>(
            `${environment.API.API_HOST}${environment.API.API_USERS}/${user.id}`,
            { ...user }
          )
          .toPromise();
        this.state$.next({
          name: RegisterStates.success,
        });
        //const tempResponse: SuccessfulRegistrationResponse = { user: userResponse };
        const handledUser = await this.handleSuccessfulRegistration({
          user: userResponse,
        });
        return handledUser;
      } catch (error) {
        if (error.status === 401) {
          try {
            await this.auth.logout();
            this.state$.next({
              name: RegisterStates.init,
            });
          } catch (logOutError) {
            this.state$.next({
              name: RegisterStates.error,
            });
            throw logOutError;
          }
        } else {
          this.state$.next({
            name: RegisterStates.error,
          });
          throw error;
        }
      }
    } else {
      throw new Error("Ongoing registration");
    }
  }

  public setKYC = async (peyyaUserId: string) => {
    const kycInformation = {
      nationality: "SE",
      identityType: "DNI",
      identityNumber: localStorage.getItem("personalNumber"),
    };
    if (peyyaUserId) {
      try {
        //await this.userService.setKYC(peyyaUserId, kycInformation);
      } catch (error) {}
    }
  };

  public async handleSuccessfulRegistration(
    response: SuccessfulRegistrationResponse
  ): Promise<User> {
    // TODO: See if this is needed
    // this.auth.setProfileStatus(UserStatus.pendingVerification);
    return Promise.resolve(response.user);
  }

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    public userService: UsersService
  ) {}
}
