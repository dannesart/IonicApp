import { UserStatus } from "@/schemas/user";
import { AuthService } from "@/services/auth.service";
import { Router } from "@angular/router";
import { Routes } from "@/enums/routes";
import { Component } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
  public Routes = Routes;

  public goTo(route: string) {
    this.router.navigateByUrl("/" + route);
  }

  public async canSeeRoute(route) {
    // TODO: See if this is needed.
    return true;
    // const profileStatus = await this.auth.getProfileState();
    // if (profileStatus === UserStatus.activated) {
    //   return true;
    // }
    // return false;
  }

  constructor(private router: Router, private auth: AuthService) {}
}
