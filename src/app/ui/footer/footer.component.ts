import { ContractService } from "@/services/contract.service";
import { Subscription } from "rxjs";
import { RoutesName } from "@/enums/routes";
import { NotificationsService } from "@/services/notifications.service";
import { PageService } from "@/services/page.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit, OnDestroy {
  public RoutesName = RoutesName;
  public notis$ = this.notis.notifications$;
  public contract$ = this.contract.getContracts$();

  private subs: Subscription[] = [];

  public footerActions = [
    // {
    //   name: RoutesName.home,
    //   route: RoutesName.home,
    //   label: "Home",
    //   color: "medium",
    //   activeColor: "primary",
    //   icon: "home-outline",
    // },
    {
      name: RoutesName.wallet,
      route: RoutesName.wallet,
      label: "Wallet",
      color: "medium",
      activeColor: "primary",
      icon: "wallet-outline",
      badge: {
        number: 0,
        color: "primary",
      },
    },
    {
      name: RoutesName.contacts,
      route: RoutesName.contacts,
      label: "contacts",
      color: "medium",
      activeColor: "primary",
      icon: "people-outline",
      badge: {
        number: 0,
        color: "primary",
      },
    },
    {
      name: RoutesName.profile,
      route: RoutesName.profile,
      label: "Profile",
      color: "medium",
      activeColor: "primary",
      icon: "settings-outline",
    },
  ];

  public goTo(route: RoutesName) {
    this.router.navigateByUrl("/" + route);
  }

  public isActive = (route: RoutesName) => {
    return this.router.isActive(route, true);
  };

  public canSeeRoute(route: RoutesName) {
    // TODO: See if this is needed
    return true;
    // const profileStatus = this.auth.getProfileStatus();
    // if (profileStatus === UserStatus.activated) {
    //   return true;
    // }
    // return false;
  }

  constructor(
    private router: Router,
    public page: PageService,
    public notis: NotificationsService,
    public contract: ContractService
  ) {}

  ngOnInit() {
    // this.subs.push(
    //   this.notis$.subscribe((allNotis) => {
    //     const profile = allNotis.filter((notis) => notis.area === "profile")
    //       .length;
    //     this.footerActions[3].badge.number = profile;
    //   })
    // );
    // this.subs.push(
    //   this.contract$.subscribe((contractsObject) => {
    //     this.footerActions[2].badge.number = contractsObject.contracts.length;
    //   })
    // );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
