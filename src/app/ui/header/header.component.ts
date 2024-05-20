import { PageService } from "@/services/page.service";
import { Routes, RoutesName } from "@/enums/routes";
import { User } from "@/schemas/user";
import { IImage } from "@/ui/image/image.component";
import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
  @Input() user: User;

  public image$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/peyya-logo-black-small.png",
    sizes: {
      width: "30px",
    },
  });

  public isNotHome() {
    return window.location.pathname !== Routes[RoutesName.home].path;
  }

  constructor(public page: PageService) {}

  ngOnInit() {}
}
