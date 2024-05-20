import { ContractService } from "@/services/contract.service";
import { WalletService } from "@/services/wallet.service";
import { PageService } from "@/services/page.service";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { fancyAnimation, slideAnimation } from "@/extras/animations";
import { User } from "@/schemas/user";
import { AuthService } from "@/services/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { getRoute, RoutesName } from "@/enums/routes";
import {
  IonRouterOutlet,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { OnboardingComponent } from "@/ui/onboarding/onboarding.component";
import { UsersService } from "@/services/users.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  public animation = fancyAnimation;
  public routerSub: Subscription;
  public loginSub: Subscription;
  public isError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public pageFullyLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  public isScanning$ = this.wallet.isScanning$;

  public stopScanning = () => {
    this.wallet.setScanning(false);
  };

  constructor(
    public auth: AuthService,
    public router: Router,
    public page: PageService,
    public user: UsersService,
    public wallet: WalletService,
    public contract: ContractService,
    public toastController: ToastController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    // Subscribe to router.
    // Get Route and if there is a title. Add it to the header.
    this.routerSub = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        const routeName = event.url
          .split("?")[0]
          .replace("/", "") as RoutesName;
        const route = getRoute(routeName);

        page.setPage({
          title: route.title,
          hideFooter: route.hideFooter || false,
        });
      });

    // Subscribe to log in state.
    // if not session has ended or missing. Display message.
    this.loginSub = auth.isAuthed$().subscribe(async (state) => {
      if (!state) {
        const toast = await toastController.create({
          message: "Your session has expired. Please log in again",
          color: "danger",
          duration: 4000,
          position: "top",
        });
        toast.present();
      }
    });
  }

  public handleOnBoarding = async (user) => {
    const status = user?.status.toLowerCase();

    const modal = await this.modalController.create({
      component: OnboardingComponent,
      cssClass: "onboarding",
      componentProps: {
        onComplete: ($event) => {},
      },
      //initialBreakpoint: 0.8,
      swipeToClose: false,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    return await modal.present();
  };

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  async ngOnInit() {
    // Get profile.
    // try {
    //   const authState: any = await this.auth.isAuthed$().toPromise();
    //   const user = authState.body.user;
    //   const status = user?.status.toLowerCase();

    //   this.isError$.next(false);

    //   if (status !== "activated" || !user) {
    //     this.auth.setProfileState(user);
    //     await this.handleOnBoarding(user);
    //   } else {
    //     this.auth.setProfileState(user);
    //   }
    //   this.pageFullyLoaded$.next(true);
    // } catch (error) {
    //   if (error.status === 404) {
    //     this.handleOnBoarding(null);
    //   }
    //   this.pageFullyLoaded$.next(true);
    //   this.isError$.next(true);
    //   this.router.navigateByUrl(RoutesName.error);
    // }

    try {
      await this.user.getUserBasedOnPhone();
      await this.wallet.getCurrencies();
    } catch (error) {}
  }
}
