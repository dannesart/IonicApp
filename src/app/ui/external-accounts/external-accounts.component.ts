import { WalletService } from "@/services/wallet.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { NewExternalAccountComponent } from "../new-external-account/new-external-account.component";

@Component({
  selector: "app-external-accounts",
  templateUrl: "./external-accounts.component.html",
  styleUrls: ["./external-accounts.component.scss"],
})
export class ExternalAccountsComponent implements OnInit, OnDestroy {
  /**
   * States
   */
  wallet$ = this.walletService.getWallet$();

  /**
   * Subs
   */

  /**
   * Close modal. This can be triggered by close button in the top right corner. or
   * By close button in the bottom.
   */
  close = async () => {
    await this.reset();
    this.modalController.dismiss({
      dismissed: true,
    });
  };

  /**
   * Reset the state. This will simply reset all forms and states.
   * This will be triggerd while loading and closing.
   */
  reset = async () => {};

  /**
   * Add new account
   */
  addNewAccunt = async () => {
    const modal = await this.modalController.create({
      component: NewExternalAccountComponent,
      cssClass: "new-external-account",
      swipeToClose: true,
      showBackdrop: true,
      initialBreakpoint: 0.5,
    });
    return await modal.present();
  };

  /**
   * Create a iban number for wallet.
   * this is need for a cash out action.
   */
  createIban = async (walletId: string) => {
    try {
      // const { id } = await this.auth.getProfileState();
      // await this.wallet.createIban(id, walletId);
      // await this.wallet.triggerFetch();
    } catch (error) {}
  };

  constructor(
    private modalController: ModalController,
    public walletService: WalletService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
