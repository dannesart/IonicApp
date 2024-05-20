import { TransactionService } from "@/services/transaction.service";
import { AuthService } from "@/services/auth.service";
import { PageService } from "@/services/page.service";
import { Observable } from "rxjs";
import { WalletService, IWallet } from "@/services/wallet.service";
import { CashInComponent } from "@/ui/cash-in/cash-in.component";
import { CashOutComponent } from "@/ui/cash-out/cash-out.component";
import { ConnectBankComponent } from "@/ui/connect-bank/connect-bank.component";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { ITransaction } from "@/schemas/transactions";
import { TransactionInformationComponent } from "@/ui/transaction-information/transaction-information.component";
import { WalletInformationComponent } from "@/ui/wallet-information/wallet-information.component";
import { Router } from "@angular/router";
import { RoutesName } from "@/enums/routes";
import { UsersService } from "@/services/users.service";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { last, tap } from "rxjs/operators";
import { UtilsService } from "@/services/utils.service";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
})
export class WalletComponent implements OnInit {
  public wallet$: Observable<IWallet>;
  // todo::
  preferredCurrency = { value: "EURe", symbol: "EUR" };
  public currencies$ = this.wallet.currencies$();
  public history$: Observable<ITransaction[]>;
  public user$ = this.user.user$;
  public currencies = [];
  public transactions$ = this.transaction.getTransactions$().pipe(
    tap((transactions) => {
      transactions.sort((a, b) => {
        return new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1;
      });
    })
  );

  constructor(
    private modalController: ModalController,
    public wallet: WalletService,
    public transaction: TransactionService,
    public auth: AuthService,
    public page: PageService,
    public user: UsersService,
    private routerOutlet: IonRouterOutlet,
    public router: Router,
    public utils: UtilsService
  ) {
    this.wallet$ = wallet.getWallet$();
    // this.history$ = transaction.getTransactions$();
    // const sub = this.wallet$.subscribe(async (wallet) => {
   
  }

  /**
   * From me?
   */
  public transactionByUser = (userId: string) => {
    const user = this.user$.value;
    return user.id === userId;
  };

  /**
   * Get initals from name
   */
  public initalsFromName = (transactionInfo: ITransaction) => {
    const user = this.transactionByUser(transactionInfo.from?._id)
      ? transactionInfo.to
      : transactionInfo.from;
    const { firstName, lastName } = user;
    return this.utils.fullNameToShort(firstName, lastName);
  };

  /**
   * Parse scanning results
   */
  private parseScan = (scan: string) => {
    console.log("SCANNED:", scan);
  };

  /**
   * Start scan
   */
  public startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    this.wallet.setScanning(true);

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      await BarcodeScanner.stopScan();
      this.parseScan(result.content);
    }
  };

  /**
   * Activity
   */
  activities = ["All activity", "Incoming", "Outgoing"];
  filterActivity = ["", "CARD_CASHIN", "BANK_ACCOUNT_CASHOUT"];
  activeActivity = 0;
  setActiveActivity = async (idx) => {
    this.activeActivity = idx;
  };

  /**
   * Go to send money view.
   * When user clicks on the "send money"-button. User should be redirected to the send money view.
   */
  goToSendMoney = () => {
    this.router.navigateByUrl(`/` + RoutesName.send);
  };

  /**
   * Go to recieve money view.
   * When user clicks on the "send money"-button. User should be redirected to the send money view.
   */
  goToRecieveMoney = () => {
    this.router.navigateByUrl(`/` + RoutesName.recieve);
  };

  /**
   * Open up a modal with cash in.
   * user should be able to open a modal and insert money to their peyya wallet.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentCashInModal = async () => {
    const modal = await this.modalController.create({
      component: CashInComponent,
      cssClass: "cash-in",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  /**
   * Open up a modal with cash in.
   * user should be able to open a modal and insert money to their peyya wallet.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentConnectBankModal = async () => {
    const modal = await this.modalController.create({
      component: ConnectBankComponent,
      cssClass: "connect-bank",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  /**
   * Open up a modal with cash out.
   * user should be able to open a modal and withdraw money to their card.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentCashOutModal = async () => {
    const modal = await this.modalController.create({
      component: CashOutComponent,
      cssClass: "cash-out",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  /**
   * Open up a modal with wallet information.
   * user should be able to open a modal and withdraw money to their card.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentWalletInformationModal = async (wallet) => {
    const modal = await this.modalController.create({
      component: WalletInformationComponent,
      cssClass: "wallet-information",
      swipeToClose: true,
      showBackdrop: true,
      componentProps: {
        walletInformation: wallet,
      },
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  /**
   * On drag down. Trigger a new fetch of wallet.
   * And on successfuly fetch. Trigger event complete.
   */
  doRefresh = async (event) => {
    try {
      await this.wallet.triggerFetch();
    } catch (error) {}

    event.target.complete();
  };

  /**
   * Get movement icon
   */
  movementIcon = (type) => {
    return this.transaction.getTypeIcon(type);
  };

  /**
   * Get movement type name
   */
  movementType = (type) => {
    return this.transaction.getTypeName(type);
  };

  /**
   * Movement message
   */
  movementMessage = (movement) => {
    return movement.status == "ERROR"
      ? movement.errorReason || movement.status
      : movement.transactions.map((o) => o.tokenAddress).join();
  };

  /**
   * Movement status
   */
  movementStatus = (status) => {
    return status;
  };

  /**
   * Open up a modal with cash in.
   * user should be able to open a modal and insert money to their peyya wallet.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentMovementInModal = async (movement) => {
    const modal = await this.modalController.create({
      component: TransactionInformationComponent,
      cssClass: "transaction",
      swipeToClose: true,
      componentProps: {
        movement,
      },
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  public async onCurrencyChange($event) {
    this.preferredCurrency.value = $event.detail.value;
    this.preferredCurrency.symbol = this.currencies?.find(
      (c) => c.value === $event.detail.value
    ).assetSymbol;
  }

  async ngOnInit() {}
}
