import { TransactionService } from "@/services/transaction.service";
import { AuthService } from "@/services/auth.service";
import { PageService } from "@/services/page.service";
import { Observable } from "rxjs";
import { WalletService, IWallet } from "@/services/wallet.service";
import { CashInComponent } from "@/ui/cash-in/cash-in.component";
import { CashOutComponent } from "@/ui/cash-out/cash-out.component";
import { ConnectBankComponent } from "@/ui/connect-bank/connect-bank.component";
import { Component, OnInit } from "@angular/core";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { ITransaction } from "@/schemas/transactions";
import { TransactionInformationComponent } from "@/ui/transaction-information/transaction-information.component";
import { WalletInformationComponent } from "@/ui/wallet-information/wallet-information.component";
import { Router } from "@angular/router";
import { RoutesName } from "@/enums/routes";
import { UsersService } from "@/services/users.service";

@Component({
  selector: "route-recieve",
  templateUrl: "./recieve.component.html",
  styleUrls: ["./recieve.component.scss"],
})
export class RecieveComponent implements OnInit {
  public history$: Observable<ITransaction[]>;
  public user$ = this.user.user$;
  public value;
  public currencies$ = this.wallet.currencies$();

  constructor(
    private modalController: ModalController,
    public wallet: WalletService,
    public transaction: TransactionService,
    public auth: AuthService,
    public page: PageService,
    public router: Router,
    public user: UsersService,
    private routerOutlet: IonRouterOutlet
  ) {
    // this.history$ = transaction.getTransactions$();
  }
  public close = () => {
    this.router.navigateByUrl(RoutesName.wallet);
  };

  public setAmount = (event) => {
    this.value = event.value;
  };

  async ngOnInit() {}
}
