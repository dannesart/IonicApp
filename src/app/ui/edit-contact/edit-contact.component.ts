import { AuthService } from "@/services/auth.service";
import { Component, Input, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { UsersService } from "@/services/users.service";

@Component({
  selector: "ui-edit-contact",
  templateUrl: "./edit-contact.component.html",
  styleUrls: ["./edit-contact.component.scss"],
})
export class EditContactComponent implements OnInit {
  @Input("mobileNumber") mobileNumber;
  @Input("firstName") firstName;
  @Input("lastName") lastName;
  @Input("saveContact") saveContact;

  /**
   * Close modal. This can be triggered by close button in the top right corner. or
   * By close button in the bottom.
   */
  close = async () => {
    this.modalController.dismiss({
      dismissed: true,
    });
  };

  public onChange = (key: string, value: any) => {
    switch (key) {
      case "mobileNumber":
        this.mobileNumber = value.value || value;
        break;
      case "firstName":
        this.firstName = value.value || value;
        break;
      case "lastName":
        this.lastName = value.value || value;
        break;
    }
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

  public saveContactOnClick = async () => {
    try {
      // Check user.
      this.saveContact(this.firstName, this.lastName, this.mobileNumber);
      this.close();
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
