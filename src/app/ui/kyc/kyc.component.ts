import { UsersService } from "@/services/users.service";
import { WalletService } from "@/services/wallet.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { NewExternalAccountComponent } from "../new-external-account/new-external-account.component";

@Component({
  selector: "app-kyc",
  templateUrl: "./kyc.component.html",
  styleUrls: ["./kyc.component.scss"],
})
export class KYCComponent implements OnInit, OnDestroy {
  /**
   * States
   */
  source$ = this.user.kyc$;

  /**
   * Subs
   */

  /**
   * Close modal. This can be triggered by close button in the top right corner. or
   * By close button in the bottom.
   */
  close = async () => {
    this.modalController.dismiss({
      dismissed: true,
    });
  };

  /***/

  constructor(
    private modalController: ModalController,
    public user: UsersService
  ) {}

  ngOnDestroy(): void {}

  async ngOnInit() {
    const kycUrl = await this.user.getKYCUrl();
  }
}
