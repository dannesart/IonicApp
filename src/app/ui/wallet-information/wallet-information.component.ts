import { ITransaction } from "@/schemas/transactions";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-wallet-information",
  templateUrl: "./wallet-information.component.html",
  styleUrls: ["./wallet-information.component.scss"],
})
export class WalletInformationComponent implements OnInit, OnDestroy {
  @Input() walletInformation;
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
