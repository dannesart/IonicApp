import { take } from "rxjs/operators";
import { Routes, RoutesName } from "@/enums/routes";
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
import { Router } from "@angular/router";

interface ICardCashOutStep {
  name: string;
  label: string;
  idx: number;
}

const CardCashOutSteps: ICardCashOutStep[] = [
  {
    label: "Amount",
    name: "amount",
    idx: 0,
  },
  {
    label: "Verifying",
    name: "loading",
    idx: 1,
  },
  {
    name: "Transfer complete",
    label: "Complete",
    idx: 2,
  },
  {
    name: "Transfer error",
    label: "Error",
    idx: 3,
  },
];

@Component({
  selector: "app-cash-out",
  templateUrl: "./cash-out.component.html",
  styleUrls: ["./cash-out.component.scss"],
})
export class CashOutComponent implements OnInit, OnDestroy {
  /**
   * States
   */
  wallet$ = this.walletService.getWallet$();
  account$ = new BehaviorSubject<string>(null);
  amount$ = new BehaviorSubject<number>(0);
  error$ = new BehaviorSubject<string>(null);
  cardCashOut$ = new BehaviorSubject<ICardCashOutStep>(CardCashOutSteps[0]);

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
   * Update account
   */
  handleAccountChange = async (event) => {
    this.account$.next(event.value || event.target.value);
  };

  /**
   * Set card cash in step
   */
  setCardCashInStep(idx: number) {
    this.cardCashOut$.next(CardCashOutSteps[idx]);
  }
  /**
   * Get card cash in step
   */
  getCardCashInStep(): ICardCashOutStep {
    return this.cardCashOut$.value;
  }

  /**
   * Handle no account click
   */
  noAccountHandler = () => {
    this.close();
    this.router.navigate([RoutesName.profile], {
      queryParams: {
        action: "openAccounts",
        returnUrl: "/wallet?action=openCashOut",
      },
    });
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
   * Init Card cash out
   */
  initCardCashOut = async () => {
    this.error$.next(null);
    try {
      const sub = this.auth
        .getProfileStateAsObservable()
        .pipe(take(1))
        .subscribe(async ({ id }) => {
          const amount = this.amount$.value;
          const accountId = this.account$.value;
          const { body }: any = await this.walletService.cashOut(id, amount);
          const { payment } = body;
          this.setCardCashInStep(2);
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
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.reset();
  }

  ngOnInit(): void {
    this.stepSub$ = this.cardCashOut$.subscribe((step: ICardCashOutStep) => {
      if (step.idx === 1) {
        this.initCardCashOut();
      }
    });
  }
}
