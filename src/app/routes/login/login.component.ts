import { AuthService as AS } from "@/services/auth.service";
import { IImage } from "@/ui/image/image.component";
import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { isValidPhone } from "@/utils/formatter";
import { InputTypes } from "@/ui/input/input.component";
import { UsersService } from "@/services/users.service";
import { RoutesName } from "@/enums/routes";
import { WalletService } from "@/services/wallet.service";

enum AuthorizationResponseStatus {
  error = "error",
  success = "success",
  successNoAccount = "successNoAccount",
}

enum LoginStates {
  loading = "loading",
  init = "init",
  prefilled = "prefilled",
  authenticates = "authenticates",
  error = "error",
  success = "success", // Temp
  successNoAccount = "successNoAccount",
}

enum LoginErrors {
  authorizationInit = "authorizationInit",
  authorizationOrderRef = "authorizationOrderRef",
}

interface LoginState {
  name: LoginStates;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  /**
   * States
   */
  public phoneNumber$ = new BehaviorSubject(null);
  public verificationCode$ = new BehaviorSubject(null);
  public LoginStates = LoginStates;
  public types = InputTypes;

  public tempUserData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public loginError$: BehaviorSubject<LoginErrors> = new BehaviorSubject<LoginErrors>(
    null
  );
  public personalNumber$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  //TODO: Take a look at this
  public state$: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>({
    name: LoginStates.loading,
  });

  public loading = false;
  public enableVerifyStep = false;
  public image$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/peyya-logo-black-768x237.png",
    sizes: {
      width: "100px",
    },
  });

  public splashImage$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/splash-image.svg",
    sizes: {
      width: "200px",
    },
  });

  public welcomeImage$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/undraw_welcome_re_h3d9.svg",
    sizes: {
      width: "300px",
    },
  });

  public logoImage$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/peyya-blue.svg",
    sizes: {
      width: "150px",
    },
  });

  /**
   * Methods
   */
  updateValue = async ($event, field) => {
    if (field === "phoneNumber") {
      this.phoneNumber$.next($event.value || $event.target.value);
    }

    if (field === "code") {
      this.verificationCode$.next($event.value || $event.target.value);
    }
  };

  // Handle log in click
  public async logIn() {
    this.loading = true;
    // this.authAngular.loginWithRedirect();
  }

  public async sendVerificationCode() {
    this.loading = true;
    const phoneNumber = this.phoneNumber$.value;
    if (isValidPhone(phoneNumber)) {
      this.auth
        .triggerPhoneAuth(phoneNumber)
        .then((resp) => {
          if (resp.ok) {
            this.loading = false;
            this.enableVerifyStep = true;
          }
        })
        .catch((error) => this.handleVerifyError(error));
    }
  }

  public async verifyCode() {
    try {
      this.loading = true;
      const code = this.verificationCode$.value;
      const phoneNumber = this.phoneNumber$.value;
      const resp = await this.auth.sendVerificationCode(code, phoneNumber);
      const user = await this.user.getUserBasedOnPhone(phoneNumber);
      const wallet = await this.wallet.triggerFetch();
      this.loading = false;

      if (user.status) {
        this.router.navigateByUrl(RoutesName.wallet);
      } else {
        this.router.navigateByUrl(RoutesName.onboarding);
      }
    } catch (error) {
      // Handle this.
      this.handleVerifyError(error);
    }
  }

  handleVerifySuccess($e) {}

  handleVerifyError(e) {
    this.loading = false;
    this.loginError$.next(e);
  }

  constructor(
    private auth: AS,
    public router: Router,
    public user: UsersService,
    public wallet: WalletService
  ) {}
}
