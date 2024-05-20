import { User } from "@/schemas/user";
import { AuthService } from "@/services/auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { WalletService } from "@/services/wallet.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { UsersService } from "@/services/users.service";
import { phoneFormatter } from "@/utils/formatter";
import { TransactionService } from "@/services/transaction.service";

@Component({
  selector: "app-new-payment",
  templateUrl: "./new-payment.component.html",
  styleUrls: ["./new-payment.component.scss"],
})
export class NewPaymentComponent implements OnInit, OnDestroy {
  /**
   * States
   */
  wallet$ = this.walletService.getWallet$();
  phone$ = new BehaviorSubject<string>(null);
  amount$ = new BehaviorSubject<number>(0);
  payment$ = new BehaviorSubject<any>(null);
  users$ = new BehaviorSubject<User[]>(null);
  error$ = new BehaviorSubject<string>(null);
  reciever$ = new BehaviorSubject<User>(null);

  saveToContact = false;

  /**
   * Handle change
   */
  handleChange = (event, field) => {
    if (field === "phone") {
      const phone = phoneFormatter(event.value);
      this.saveToContact = event.saveToContact || false;
      this.phone$.next(phone);
    } else if (field === "amount") {
      const amount = parseFloat(event.value || "0");
      this.amount$.next(amount);
    }
  };

  /**
   * Clear reciever
   */
  clearField = (field) => {
    if (field === "phone") {
      this.phone$.next(null);
    } else if (field === "amount") {
      this.amount$.next(null);
    }
  };

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
    this.modalController.dismiss({
      dismissed: true,
    });
  };

  /**
   * Get users based on phone
   */
  getUsers = async () => {
    const phone = this.phone$.value;
    this.clearUsers();
    try {
      const users = await this.usersService.getRecipientBasedOnPhone(phone);
      this.users$.next(users);
    } catch (error) {
      this.error$.next("Could not find a user.");
    }
  };

  /**
   * Clear users
   */
  clearUsers = () => {
    this.users$.next(null);
  };

  /**
   * Select reciever
   */
  selectReciever = (user: User) => {
    this.reciever$.next(user);
  };

  /**
   * Clear reciever
   */
  clearReciever = () => {
    this.reciever$.next(null);
    this.clearField("phone");
    this.clearUsers();
  };

  /**
   * Send payment
   */
  sendPayment = async () => {
    const phone = this.phone$.value;
    const targetUser = await this.usersService.getRecipientBasedOnPhone(phone);

    if (this.amount$.value > 0 && targetUser && targetUser.length) {
      const target = targetUser[0];
      const user = await this.auth.getProfileState();
      const targetUserId = target._id || target.id;
      const userId = user.id;
      const amount = this.amount$.value;
      try {
        const response = await this.transactionService.createTransaction(
          userId,
          targetUserId,
          amount,
          ""
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (!targetUser || !targetUser.length) {
      const toast = await this.toastController.create({
        message: "That user doesn't seems to be a peyya user.",
        color: "danger",
        duration: 4000,
        position: "top",
      });

      toast.present();
    }
  };

  /**
   * Init payment
   */
  initCardCashIn = async () => {
    this.error$.next(null);
    // try {
    //   const { id } = this.auth.getProfileState();
    //   const amount = this.amount$.value;
    //   const { body }: any = await this.walletService.cashIn(id, amount);
    //   const { payment } = body;
    //   this.payment$.next(payment);
    // } catch (error) {
    //   this.error$.next(error);
    // }
  };

  constructor(
    private usersService: UsersService,
    public walletService: WalletService,
    public auth: AuthService,
    private modalController: ModalController,
    public transactionService: TransactionService,
    public toastController: ToastController
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
