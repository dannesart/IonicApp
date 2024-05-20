import { PageService } from "@/services/page.service";
import { Router } from "@angular/router";
import { User } from "@/schemas/user";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "@/services/auth.service";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RegisterService, RegisterStates } from "@/services/register.service";
import { getRoute, RoutesName } from "@/enums/routes";
import { phoneFormatter, isValidPhone } from "@/utils/formatter";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-complete-account",
  templateUrl: "./complete-account.component.html",
  styleUrls: ["./complete-account.component.scss"],
})
export class CompleteAccountComponent implements OnInit {
  @Output("onComplete") onComplete = new EventEmitter();
  @Output("onError") onError = new EventEmitter();

  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public userState$: Observable<any> = this.auth.getProfileStateAsObservable();
  public registerStates = RegisterStates;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  /**
   * Complete account registration with sending user information
   * To registrate new user
   */

  public async handleClick(userState) {
    if (this.loading$.value) {
      console.log("already loading");
      return;
    }

    /**
     * Set state to loading.
     * So we can visualize for a user that something is happening.
     */

    this.loading$.next(true);

    try {
      /**
       *  Define user object. Get values from behaviour subject.
       */
      const { family_name, given_name, id } = userState;

      const user: User = {
        id,
        firstName: given_name,
        lastName: family_name,
        ...this.user$.value,
      };
      /**
       * Trigger registration
       */
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      await this.reg.registerNewUser(user);
      // If success. Emit event to onboarding process.
      this.onComplete.emit(true);
      this.loading$.next(false);
    } catch (error) {
      this.onError.emit(error);
      this.loading$.next(false);

      const toast = await this.toastController.create({
        message:
          "Could not create an account right now. Please try again later",
        color: "danger",
        duration: 5000,
        position: "top",
      });

      toast.present();
    }
  }

  /**
   * Handle input change.
   * Save it to the state.
   */
  public handleInputChange(key, value) {
    const user: User = this.user$.value;
    //TODO: Handle this differently
    if (key === "mobilePhone") {
      value = phoneFormatter(value);
    }
    this.user$.next({ ...user, [key]: value });
  }

  constructor(
    public auth: AuthService,
    public reg: RegisterService,
    public router: Router,
    public page: PageService,
    private toastController: ToastController
  ) {
    //this.user$.next(auth.getProfileState());

    // Set page information
    const route = getRoute(RoutesName.completeAccount);

    page.setPage({
      title: route.title,
      hideFooter: route.hideFooter || false,
    });
  }

  ngOnInit() {}
}
