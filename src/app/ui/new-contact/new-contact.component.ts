import { take } from "rxjs/operators";
import { AuthService } from "@/services/auth.service";
import { WalletService } from "@/services/wallet.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { UsersService } from "@/services/users.service";
import { IContact } from "@/schemas/user";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "ui-new-contact",
  templateUrl: "./new-contact.component.html",
  styleUrls: ["./new-contact.component.scss"],
})
export class NewContactComponent implements OnInit {
  public phoneNumber$ = new BehaviorSubject<string>(null);
  public country$ = new BehaviorSubject<string>(null);

  /**
   * Close modal. This can be triggered by close button in the top right corner. or
   * By close button in the bottom.
   */
  close = async () => {
    this.modalController.dismiss({
      dismissed: true,
    });
  };

  public updateCountry = (input$) => {
    const value = input$.value || input$;
    this.country$.next(value);
  };

  public updatePhoneNumber = (input$) => {
    const value = input$.value || input$.target.value;
    this.phoneNumber$.next(value);
  };

  private showError = async (message: string) => {
    const toast = await this.toastController.create({
      message: message,
      color: "danger",
      duration: 4000,
      position: "top",
    });

    toast.present();
  };

  public addNewContact = async () => {
    try {
      // Check user.
      const user = await this.user.getRecipientBasedOnPhone(
        this.phoneNumber$.value
      );

      if (user) {
        const contact: IContact = {
          mobilePhone: user.mobilePhone,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          country: this.country$.value,
        };
        this.user.saveNewContact(contact);
        this.close();
      } else {
        this.showError("No user found");
      }
    } catch (error) {
      this.showError("An undefined error happend. Please try again.");
    }
  };

  constructor(
    public user: UsersService,
    public auth: AuthService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
}
