import { TransactionService } from "@/services/transaction.service";
import { AuthService } from "@/services/auth.service";
import { PageService } from "@/services/page.service";
import { BehaviorSubject } from "rxjs";
import { WalletService } from "@/services/wallet.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { isValidPhone } from "@/utils/formatter";
import { UsersService } from "@/services/users.service";
import { IContact } from "@/schemas/user";
import { RoutesName } from "@/enums/routes";

@Component({
  selector: "route-send",
  templateUrl: "./send.component.html",
  styleUrls: ["./send.component.scss"],
})
export class SendComponent implements OnInit {
  public recipient$ = new BehaviorSubject(null);
  public recipientValue$ = new BehaviorSubject(null);
  public amount$ = new BehaviorSubject(null);
  public message$ = new BehaviorSubject(null);
  public recipientLookup$ = new BehaviorSubject(null);
  public isError$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public isSuccess$ = new BehaviorSubject<boolean>(false);
  public currency$ = new BehaviorSubject<string>("EUR");
  public currencies$ = this.wallet.currencies$();
  currencies = [];
  preferredCurrency = "EURe";
  public user$: any = this.usersService.user$;
  public country;
  public errorObj = {};
  public userBalance = 0;

  constructor(
    public wallet: WalletService,
    public transaction: TransactionService,
    public auth: AuthService,
    public page: PageService,
    public usersService: UsersService,
    public router: Router
  ) {
    // wallet.currencies$.subscribe((resp) => {
    //   this.currencies = resp;
    // });

    wallet.getWallet$().subscribe((resp) => {
      this.userBalance = resp.balance || 0;
      // this.preferredCurrency = this.currencies?.find(
      //   (c) => c.assetSymbol === resp.assetSymbol
      // ).value;
    });
  }

  public returnToSendMoneyView = () => {
    this.isSuccess$.next(false);
    this.isError$.next(false);
    this.errorObj = {};
  };

  public goBack = () => {
    this.router.navigateByUrl(RoutesName.wallet);
  };

  pickFavorite = async (contact: IContact) => {
    this.country = contact.country;
    this.recipientValue$.next(contact.mobilePhone);
    this.recipient$.next(contact.mobilePhone);
    this.errorObj["recipient"] = null;
  };

  updateCountry = async ($event) => {
    this.country = $event.value || $event;
  };

  updateValue = async ($event, field) => {
    if (field === "recipient") {
      this.recipient$.next($event.value || $event.target.value);
    }

    if (field === "amount") {
      this.amount$.next($event.value || $event.target.value);
    }

    if (field === "message") {
      this.message$.next($event.value || $event.target.value);
    }
  };

  public async sendMoney() {
    const recipient = this.recipient$.value;
    const userPhone = this.user$.value.mobilePhone;
    try {
      // Validate Phone
      if (!isValidPhone(recipient))
        throw Error(JSON.stringify({ recipient: "Invalid Phone Number" }));

      if (userPhone === recipient)
        throw Error(
          JSON.stringify({ recipient: "You can't send money to yourself" })
        );

      // Validate Amount
      const amount = +this.amount$.value;
      if (!amount) throw Error(JSON.stringify({ amount: "Invalid Amount" }));

      if (this.userBalance < amount)
        throw Error(JSON.stringify({ amount: "Insufficient Amount" }));
      // lookup user
      this.isLoading$.next(true);
      const userLookup = await this.usersService.getRecipientBasedOnPhone(
        recipient
      );
      if (!userLookup) throw Error(JSON.stringify({ amount: "No user found" }));

      this.recipientLookup$.next(userLookup);

      // Create Transaction Api
      const tx = await this.transaction.sendMoney(
        userLookup.mobilePhone,
        amount,
        this.message$.value,
        this.preferredCurrency
      );
      this.isLoading$.next(false);
      this.isSuccess$.next(true);

      // Get wallet once transaction is complete.
      // But we wait 10 seconds so the wallet get's time to be updated.
      setTimeout(async () => {
        await this.wallet.triggerFetch();
      }, 10000);
    } catch (err) {
      this.isLoading$.next(false);
      if (err.status) {
        this.isError$.next(true);
      } else {
        this.errorObj = JSON.parse(err.message);
        console.log(this.errorObj);
      }
    }
  }

  public async onCurrencyChange($event) {
    this.preferredCurrency = $event;
  }

  async ngOnInit() {}
}
