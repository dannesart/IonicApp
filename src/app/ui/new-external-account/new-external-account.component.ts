import { take } from "rxjs/operators";
import { AuthService } from "@/services/auth.service";
import { WalletService } from "@/services/wallet.service";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-new-external-account",
  templateUrl: "./new-external-account.component.html",
  styleUrls: ["./new-external-account.component.scss"],
})
export class NewExternalAccountComponent implements OnInit {
  public accountNumber$ = new BehaviorSubject<string>(null);
  public accountName$ = new BehaviorSubject<string>(null);

  /**
   * Close modal. This can be triggered by close button in the top right corner. or
   * By close button in the bottom.
   */
  close = async () => {
    this.modalController.dismiss({
      dismissed: true,
    });
  };

  public updateAccountNumber = (input$) => {
    const value = input$.value || input$.target.value;
    this.accountNumber$.next(value);
  };

  public updateAccountName = (input$) => {
    const value = input$.value || input$.target.value;
    this.accountName$.next(value);
  };

  public addNewAccount = async () => {
    try {
      const sub = this.auth
        .getProfileStateAsObservable()
        .pipe(take(1))
        .subscribe(async ({ id }) => {
          const accountNumber = this.accountNumber$.value;
          const name = this.accountName$.value;
          if (name && accountNumber) {
          }
          sub.unsubscribe();
        });
    } catch (error) {}
  };

  constructor(
    public wallet: WalletService,
    public auth: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
}
