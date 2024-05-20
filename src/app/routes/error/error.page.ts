import { RoutesName } from "@/enums/routes";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { IImage } from "@/ui/image/image.component";

@Component({
  selector: "app-error",
  templateUrl: "error.page.html",
  styleUrls: ["error.page.scss"],
})
export class ErrorPage implements OnInit {
  public image$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/peyya-logo-black-768x237.png",
    sizes: {
      width: "200px",
    },
  });

  public goToStart = () => {
    this.router.navigateByUrl(RoutesName.home);
  };

  constructor(public router: Router) {
    // All steps that must be ok before pageFullLoaded can be set to true.
  }

  async ngOnInit() {}
}
