import { take } from "rxjs/operators";
import { AuthService } from "@/services/auth.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { WalletService } from "@/services/wallet.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-connect-bank",
  templateUrl: "./connect-bank.component.html",
  styleUrls: ["./connect-bank.component.scss"],
})
export class ConnectBankComponent implements OnInit, OnDestroy {
  /**
   * States
   */
  bankNumber$ = new BehaviorSubject<string>(null);
  expireDate$ = new BehaviorSubject<string>(null);
  cvc$ = new BehaviorSubject<string>(null);
  wallet$ = this.walletService.getWallet$();
  cardCashInFrame$ = new BehaviorSubject<string>(null);
  payment$ = new BehaviorSubject<any>(null);
  error$ = new BehaviorSubject<string>(null);

  /**
   * Subs
   */
  stepSub$: Subscription;

  /**
   * Handle change
   */
  handleChange = (event) => {};

  /**
   * Update wallet state
   */
  updateWallet = async (state: { [key: string]: any }) => {
    await this.walletService.updateWallet(state);
  };

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
  reset = async () => {
    if (this.stepSub$) {
      this.stepSub$.unsubscribe();
    }
  };

  constructor(
    public walletService: WalletService,
    public auth: AuthService,
    private modalController: ModalController
  ) {}

  ngOnDestroy(): void {
    this.reset();
  }

  ngOnInit(): void {}
}
