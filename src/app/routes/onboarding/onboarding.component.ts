import { RoutesName } from "@/enums/routes";
import { KycService } from "@/services/kyc.service";
import { UsersService } from "@/services/users.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"],
})
export class OnboardingComponent implements OnInit {
  public firstName$ = new BehaviorSubject(null);
  public lastName$ = new BehaviorSubject(null);
  public errorObj = {};

  constructor(
    public kyc: KycService,
    public router: Router,
    public user: UsersService,
    private toastController: ToastController
  ) {}

  updateValue = async ($event, field) => {
    if (field === "firstName") {
      this.firstName$.next($event.value || $event.target.value);
    }

    if (field === "lastName") {
      this.lastName$.next($event.value || $event.target.value);
    }
  };

  public async save() {
    try {
      const firstName = this.firstName$.value;
      const lastName = this.lastName$.value;

      const response = await this.kyc.save(firstName, lastName);
      if (response && response.status === 200) {
        await this.user.getUserBasedOnPhone();
        this.router.navigateByUrl(RoutesName.wallet);
      }
    } catch (error) {
      // Handle this.
      const toast = await this.toastController.create({
        message:
          "An unexpected error seems to have appeared. Please try again later.",
        color: "danger",
        duration: 4000,
        position: "top",
      });

      toast.present();
    }
  }

  ngOnInit() {}
}
