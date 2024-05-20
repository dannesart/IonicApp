import { UsersService } from "@/services/users.service";
import { WalletService } from "@/services/wallet.service";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "@/schemas/user";
import { AuthService } from "@/services/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { SettingsComponent } from "@/ui/settings/settings.component";
import { ExternalAccountsComponent } from "@/ui/external-accounts/external-accounts.component";
import { ActivatedRoute } from "@angular/router";
import { KYCComponent } from "@/ui/kyc/kyc.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile$ = this.userService.user$;
  wallet$ = this.walletService.getWallet$();
  updatingKYC$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  queryParams$;

  /**
   * Top up.
   * Just a temporary top up method. To add more money.
   */
  public topUp = async () => {
    const amount = "0.01";
    try {
      await this.walletService.cashIn(amount);
      await this.walletService.triggerFetch();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Open up a modal with settings.
   * user should be able to open a modal and change their settings.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentSettingsModal = async () => {
    const modal = await this.modalController.create({
      component: SettingsComponent,
      cssClass: "settings",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  /**
   * Open up a modal with external accounts.
   * user should be able to open a modal and see/add/remove their external accounts.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentExternalAccountsModal = async () => {
    const modal = await this.modalController.create({
      component: ExternalAccountsComponent,
      cssClass: "external-accounts",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  public presentKYCModal = async (user) => {
    const modal = await this.modalController.create({
      component: KYCComponent,
      cssClass: "kyc",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  public logout = async () => {
    await this.auth.logout();
  };

  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private walletService: WalletService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // this.profile = await ;
    this.queryParams$ = this.route.queryParams.subscribe((queries) => {
      if (queries && queries.action) {
        if (queries.action === "openAccounts") {
          this.presentExternalAccountsModal();
        }
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.queryParams$.unsubscribe();
  }
}
