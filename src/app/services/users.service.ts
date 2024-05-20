import { RoutesName } from "@/enums/routes";
import { IContact, User } from "@/schemas/user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@environments/environment";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root",
})
export class UsersService {
  private contactsKey = "peyya-contacts";
  public user$ = new BehaviorSubject<User>(null);
  public kyc$ = new BehaviorSubject({});
  public contacts$ = new BehaviorSubject([]);

  public getUserBasedOnPhone = async (phone?: string) => {
    try {
      let params = {};
      if (phone) {
        params["phoneNumber"] = phone;
      }
      const response = await this.http
        .get<any>(`${environment.API.API_HOST}${environment.API.API_USERS}`, {
          params,
        })
        .toPromise();
      if (!response.id) {
        throw new Error("User has been deleted and log out");
      }
      if (!response.status) {
        this.router.navigateByUrl(RoutesName.onboarding);
        return;
      }
      this.user$.next(response);
      this.getContacts();
      return response;
    } catch (error) {
      const toast = await this.toastController.create({
        message: error.message,
        color: "danger",
        duration: 4000,
        position: "top",
      });
      toast.present();
      this.authService.logout();
    }
  };

  public getRecipientBasedOnPhone = async (phone?: string) => {
    try {
      const response = await this.http
        .get<any>(`${environment.API.API_HOST}${environment.API.API_USERS}`, {
          params: { phoneNumber: phone },
        })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  };

  public getKYCUrl = async () => {
    try {
      const response = await this.http
        .get<any>(
          `${environment.API.API_HOST}${environment.API.API_USERS}/kyc-by-url`,
          {}
        )
        .toPromise();
      this.kyc$.next(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  private getContacts = () => {
    const key = this.contactsKey + this.user$.value.mobilePhone;

    this.contacts$.next(JSON.parse(localStorage.getItem(key) || "[]"));
  };

  public getFavoriteContacts = () => {
    return this.contacts$.value.filter((contact) => contact.favorite);
  };

  private updateStore = (contacts: IContact[]) => {
    const key = this.contactsKey + this.user$.value.mobilePhone;
    localStorage.setItem(key, JSON.stringify(contacts));
    this.contacts$.next(contacts);
  };

  public saveNewContact = (newContact: IContact) => {
    let contacts = this.contacts$.value;
    contacts.unshift(newContact);
    this.updateStore(contacts);
  };

  public updateContact = (i: number, firstName: string, lastName: string) => {
    let contacts = this.contacts$.value;
    contacts[i] = { ...contacts[i], firstName, lastName };
    this.updateStore(contacts);
  };

  public removeContact = (i: number) => {
    let contacts = this.contacts$.value;
    contacts.splice(i, 1);
    this.updateStore(contacts);
  };

  public toggleFavorite = (i: number) => {
    let contacts = this.contacts$.value;
    contacts[i] = { ...contacts[i], favorite: !contacts[i].favorite };
    this.updateStore(contacts);
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}
}
