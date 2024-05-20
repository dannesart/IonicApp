import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { RoutesName } from "@/enums/routes";
import { AuthService } from "@/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private auth: AuthService) {}

  // Routes that doesnt need auth. But if user is auth, redirect to {Routes.home}
  private dontNeedsAuth = [RoutesName.login];

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // TODO: Implement auth service and get auth state based on authtoken
    return this.auth.isAuthed$().pipe(
      map((isLogedIn) => {
        // Check if loged in.
        // If true, check if route is login
        if (isLogedIn) {
          // User
          // const { status } = this.auth.getProfileState();

          // Check if user needs to complete account.
          // and if user is on another route.
          // Then redirect user to CompleteAccount route.
          // if (
          //   status === UserStatus.notcompleted &&
          //   state.url.indexOf(RoutesName.completeAccount) === -1
          // ) {
          //   // If user not completed account. Route to complete url.
          //   this.router.navigateByUrl("/" + RoutesName.completeAccount);
          //   return true;
          // }

          // Check if user needs to verify phone.
          // and if user is on another route.
          // Then redirect user to VerifyPhone route.
          // if (
          //   status === UserStatus.unverified ||
          //   (status === UserStatus.pendingVerification &&
          //     state.url.indexOf(RoutesName.verifyPhone) === -1)
          // ) {
          //   // If user not completed account. Route to complete url.
          //   this.router.navigateByUrl("/" + RoutesName.verifyPhone);
          //   return true;
          // }

          // ELSE!
          // If true, redirect to home/start/landing-logedin -route.

          if (
            this.dontNeedsAuth.some((route) => state.url.indexOf(route) > -1)
          ) {
            this.router.navigateByUrl("/" + RoutesName.home);
          }
          return true;
        }
        // If false, check if route is not login
        else {
          if (
            !this.dontNeedsAuth.some((route) => state.url.indexOf(route) > -1)
          ) {
            this.router.navigateByUrl("/" + RoutesName.login);
          }
        }
        return true;
      })
    );
  }
}
