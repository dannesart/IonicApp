import { WalletService } from "@/services/wallet.service";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "@/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { IImage } from "@/ui/image/image.component";
import { IonRouterOutlet, ModalController } from "@ionic/angular";
import { NewPaymentComponent } from "@/ui/new-payment/new-payment.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public blobs = [
    {
      size: 200,
      color: "#fa789220",
      speed: 1,
      path: "",
      position: { x: 50, y: 50 },
    },
    {
      size: 100,
      color: "#fa789210",
      speed: 1,
      path: "",
      position: { x: 0, y: window.innerHeight - 300 },
    },
    {
      size: 400,
      color: "#fa789230",
      speed: 1,
      path: "",
      position: { x: window.innerWidth - 200, y: window.innerHeight - 500 },
    },
  ];

  public pageFullyLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public logo$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/icon/Logo.svg",
    sizes: {
      width: "45px",
    },
  });

  public image$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/peyya-logo-black-768x237.png",
    sizes: {
      width: "200px",
    },
  });

  public openNewPayment = async () => {
    const modal = await this.modalController.create({
      component: NewPaymentComponent,
      cssClass: "new-payment",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  constructor(
    public auth: AuthService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private wallet: WalletService
  ) {
    // All steps that must be ok before pageFullLoaded can be set to true.
    setTimeout(() => {
      this.pageFullyLoaded$.next(true);
    }, 1000);
  }

  async ngOnInit() {}
}
