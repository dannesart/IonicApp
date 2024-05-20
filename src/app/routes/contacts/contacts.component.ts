import { RoutesName } from "@/enums/routes";
import { fancyAnimation } from "@/extras/animations";
import { AuthService } from "@/services/auth.service";
import { UsersService } from "@/services/users.service";
import { EditContactComponent } from "@/ui/edit-contact/edit-contact.component";
import { NewContactComponent } from "@/ui/new-contact/new-contact.component";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "route-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
})
export class ContactsComponent implements OnInit {
  constructor(
    public user: UsersService,
    public auth: AuthService,
    public router: Router,
    private modalController: ModalController
  ) {}

  public fancyAnimation = fancyAnimation;
  public searchQuery;

  public goBack = () => {
    this.router.navigateByUrl(RoutesName.wallet);
  };

  public addNewContact = async () => {
    const modal = await this.modalController.create({
      component: NewContactComponent,
      cssClass: "new-contact",
      swipeToClose: true,
      showBackdrop: true,
      initialBreakpoint: 0.5,
    });
    return await modal.present();
  };

  public editContact = async (firstName, lastName, mobileNumber, idx) => {
    const modal = await this.modalController.create({
      component: EditContactComponent,
      cssClass: "edit-contact",
      swipeToClose: true,
      showBackdrop: true,
      initialBreakpoint: 0.8,
      componentProps: {
        firstName,
        lastName,
        mobileNumber,
        saveContact: (firstName, lastName, mobileNumber) => {
          this.user.updateContact(idx, firstName, lastName);
        },
      },
    });
    return await modal.present();
  };

  public doRefresh = (event) => {
    event.target.complete();
  };

  public toggleFavorite = (user, i) => {
    this.user.toggleFavorite(i);
  };

  public remove = (user, i) => {
    this.user.removeContact(i);
  };

  ngOnInit() {}
}
