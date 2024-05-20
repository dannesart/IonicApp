import { UserStatus } from "@/schemas/user";
import { AuthService } from "@/services/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BehaviorSubject, Subscription } from "rxjs";

interface OnboardingState {
  title: string;
  name: UserStatus;
}

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"],
})
export class OnboardingComponent implements OnInit, OnDestroy {
  private _userSub: Subscription;
  private _states: { [key: string]: OnboardingState } = {
    [UserStatus.notcompleted]: {
      title: "",
      name: UserStatus.notcompleted,
    },
    [UserStatus.pendingVerification]: {
      title: "",
      name: UserStatus.pendingVerification,
    },
  };
  public userStatus = UserStatus;
  public activeState$: BehaviorSubject<OnboardingState> = new BehaviorSubject<OnboardingState>(
    null
  );

  /**
   * Set initial state. We want to show user correct module based on status.
   * So we need to get status from user state, if there is no status. We fallback to notcompleted.
   */
  public setState = async (state: UserStatus) => {
    const active = this.activeState$.value;
    if (!active || active.name !== state) {
      if (!this._states[state]) {
        console.log(`No matching state for ${state}`);
      }
      this.activeState$.next(
        this._states[state] || this._states[UserStatus.notcompleted]
      );
    }
  };

  /**
   * Close modal. Should only be called on when user onboading is completed.
   */
  public close = async () => {
    this.modal.dismiss({
      dismissed: true,
    });
  };

  /**
   * When onboarding process is completed. We want to handle this.
   * Update userState and close modal. So we can trigger necessary calls.
   */
  public complete = async () => {
    // First update user state
    await this.auth.isAuthed$().toPromise();

    // Close modal.
    await this.close();
  };

  /**
   * Handle complete account success.
   */
  public handleCompleteAccountSuccess = async ($event) => {
    this.setState(UserStatus.pendingVerification);
  };

  /**
   * Handle complete account error.
   */
  public handleCompleteAccountError = async ($event) => {
    // Handle this
  };

  /**
   * Handle phone verification success
   */
  public handleVerifySuccess = async ($event) => {
    await this.complete();
  };

  /**
   * Handle phone verification error
   */
  public handleVerifyError = async ($event) => {
    // Handle this
  };

  /**
   * Log out button.
   * Needed for user, if they feel like they loged with wrong auth service.
   */
  public logOut = async () => {
    try {
      const loggedOut = await this.auth.logout();
    } catch (error) {
      // Do something
    }
  };

  constructor(public auth: AuthService, public modal: ModalController) {}

  async ngOnInit() {
    this._userSub = this.auth
      .getProfileStateAsObservable()
      .subscribe((user) => {
        if (user.status) {
          this.setState(user.status);
        } else {
          this.setState(UserStatus.notcompleted);
        }
      });
  }

  async ngOnDestroy() {
    if (this._userSub) {
      this._userSub.unsubscribe();
    }
  }
}
