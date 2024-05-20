import { take } from "rxjs/operators";
import { AuthService } from "@/services/auth.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { WalletService } from "@/services/wallet.service";
import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { ModalController } from "@ionic/angular";

interface ICardCashInStep {
  name: string;
  label: string;
  idx: number;
}

const CardCashInSteps: ICardCashInStep[] = [
  {
    name: "Amount",
    label: "Amount",
    idx: 0,
  },
  {
    name: "Card information",
    label: "Card details",
    idx: 1,
  },
  {
    name: "Transfer complete",
    label: "Done",
    idx: 2,
  },
  {
    name: "Transfer error",
    label: "Error",
    idx: 3,
  },
];

@Component({
  selector: "app-cash-in",
  templateUrl: "./cash-in.component.html",
  styleUrls: ["./cash-in.component.scss"],
})
export class CashInComponent implements OnInit, OnDestroy {
  /**
   * States
   */
  wallet$ = this.walletService.getWallet$();
  amount$ = new BehaviorSubject<number>(0);
  cardCashIn$ = new BehaviorSubject<ICardCashInStep>(CardCashInSteps[0]);
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
  handleChange = (event) => {
    const amount = parseFloat(event.value || event.target.value || "0");
    this.amount$.next(amount);
  };

  /**
   * Update wallet state
   */
  updateWallet = async (state: { [key: string]: any }) => {
    await this.walletService.updateWallet(state);
  };

  /**
   * Set card cash in step
   */
  setCardCashInStep(idx: number) {
    this.cardCashIn$.next(CardCashInSteps[idx]);
  }
  /**
   * Get card cash in step
   */
  getCardCashInStep(): ICardCashInStep {
    return this.cardCashIn$.value;
  }

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
   * Init Card cash in
   */
  initCardCashIn = async () => {
    this.error$.next(null);
    try {
      const sub = this.auth
        .getProfileStateAsObservable()
        .pipe(take(1))
        .subscribe(async ({ id }) => {
          // const amount = this.amount$.value;
          // const { body }: any = await this.walletService.cashIn(amount);
          // const { payment } = body;
          // this.cardCashInFrame$.next(payment.paymentUrl);
          // this.payment$.next(payment);
          sub.unsubscribe();
        });
    } catch (error) {
      this.error$.next(error);
      this.setCardCashInStep(3);
    }
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

  ngOnInit(): void {
    this.stepSub$ = this.cardCashIn$.subscribe((step: ICardCashInStep) => {
      if (step.idx === 1) {
        this.initCardCashIn();
      }
    });
  }
}
