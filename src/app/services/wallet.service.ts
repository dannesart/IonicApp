import { NotificationsService } from "@/services/notifications.service";
import { TransactionService } from "@/services/transaction.service";
import { AuthService } from "@/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "@environments/environment";
import { map, take } from "rxjs/operators";

export const currencies = [
  {
    icon: "€",
    name: "euro",
  },
];

export interface IExternalAccount {
  favouriteExternalAccountId: string;
  alias: string;
  externalIban: string;
  status: string;
}

export interface IWallet {
  id: string;
  balance: number;
  getting: boolean;
  initalFetch: boolean;
  hasIban: boolean;
  externalAccounts: IExternalAccount[];
  assetSymbol: string;
}

export interface ICashIn {
  amount: number;
  walletId: string;
}

@Injectable({
  providedIn: "root",
})
export class WalletService implements OnDestroy {
  private checkWallet;
  private isScanning = new BehaviorSubject<boolean>(false);
  private currencies = new BehaviorSubject(null);
  private state$: BehaviorSubject<IWallet> = new BehaviorSubject<IWallet>({
    id: null,
    balance: null,
    getting: false,
    initalFetch: false,
    assetSymbol: "EUR",
    hasIban: false,
    externalAccounts: [],
  });
  
  
  public isScanning$ = () => this.isScanning.asObservable();
  public setScanning = (state: boolean) => this.isScanning.next(state); 
  public currencies$ = () => this.currencies.asObservable();


  /**
   * Get wallet. Returns wallet state as an observable.
   * Subscribe will return IWallet model.
   */
  public getWallet$ = () => {
    if (!this.state$.value.initalFetch) {
      this.triggerFetch();
    }
    return this.state$.asObservable();
  };

  /**
   * Top up.
   * Calls cash in api on an interval of 3 second.
   * Retries for 4 times on fail of cash in api
   */
  async topUp() {
    const amount = "10";
    let stop = false;
    let tracker = 0;

    do {
      await sleep(3000);
      try {
        tracker += 1;
        await this.cashIn(amount);
        // await this.wallet.triggerFetch();
        stop = true;
      } catch (error) {
        console.log(error);
        stop = tracker === 5 ? true : false;
      }
    } while (!stop);

    if (stop && tracker === 5) console.log(`Can't top up`);

    if (!stop) console.log("Wallet loaded successfuly");
  }

  /**
   * Update wallet. Updates the wallet state observable with new data.
   */
  public updateWallet = async (newState: { [key: string]: any }) => {
    this.state$.next({ ...this.state$.value, ...newState });
  };

  public cashIn = async (amount: string) => {
    try {
      const response = await this.http
        .post(
          `${environment.API.API_HOST}${environment.API.API_WALLET}/cashIn`,
          {
            amount: amount,
          },
          { observe: "response" }
        )
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  };

  public cashOut = async (userId: string, amount: number) => {
    const { id } = this.state$.value;
    try {
      const response = await this.http
        .post(
          `${environment.API.API_HOST}${environment.API.API_WALLET}/${userId}/wallet/${id}/cardCashOut`,
          {
            amount: amount,
            concept: null,
          },
          { observe: "response" }
        )
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  };

  private getWallet = async () => {
    try {
      const response = await this.http
        .get(`${environment.API.API_HOST}${environment.API.API_WALLET}/`, {})
        .pipe(
          map(
            async (res: {
              wallet: any;
              message: string;
              balance: string | number;
            }) => {
              return res;
            }
          )
        )
        .toPromise();
      const balance =
        typeof response.balance === "string"
          ? Number(response.balance)
          : response.balance;

      await this.updateWallet({
        balance,
      });
      if (balance === 0) {
        await this.topUp();
      }
      return response;
    } catch (error) {
      this.updateWallet({ getting: false, balance: 0 });

      throw error;
    }
  };

  private isGetting = () => {
    return this.state$.value.getting;
  };

  public triggerFetch = async (options?: any) => {
    try {
      await this.updateWallet({ getting: true });
      const sub = this.auth
        .getProfileStateAsObservable()
        .pipe(take(1))
        .subscribe(async () => {
          try {
            await this.getWallet();
            const walletId = this.state$.value.id;
            await this.transaction.getTransactionHistory();
            // await this.getExternalAccounts(id, walletId);
            await this.updateWallet({ getting: false, initalFetch: true });
          } catch (error) {
            await this.updateWallet({ getting: false });
          }
          sub.unsubscribe();
        });
    } catch (error) {
      throw error;
    }
  };

  public silentRefresh = () => {};

  public getCurrencies = async () => {
    try {
      const response = await this.http
        .get<any>(
          `${environment.API.API_HOST}${environment.API.API_WALLET}/currencies`,
          {}
        )
        .toPromise();
      if (response.status === 200) {
        this.currencies.next(response.currencies);
      }
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private transaction: TransactionService,
    private notis: NotificationsService
  ) {}

  ngOnDestroy(): void {}
}

const sleep = (m) => new Promise((r) => setTimeout(r, m));
