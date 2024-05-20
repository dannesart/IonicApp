import { ITransaction } from "@/schemas/transactions";
import { AuthService } from "@/services/auth.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { WalletService } from "@/services/wallet.service";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-transaction-information",
  templateUrl: "./transaction-information.component.html",
  styleUrls: ["./transaction-information.component.scss"],
})
export class TransactionInformationComponent implements OnInit, OnDestroy {
  @Input() movement: ITransaction;
  /**
   * States
   */

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

  constructor(private modalController: ModalController) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
