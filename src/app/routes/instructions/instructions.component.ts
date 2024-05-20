import { IImage } from "@/ui/image/image.component";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-instructions",
  templateUrl: "./instructions.component.html",
  styleUrls: ["./instructions.component.scss"],
})
export class InstructionsComponent implements OnInit {
  public splashImage$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({
    url: "/assets/images/splash-image.svg",
    sizes: {
      width: "300px",
    },
  });

  public splashImageTwo$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>(
    {
      url: "/assets/images/undraw_a_moment_to_relax_bbpa.svg",
      sizes: {
        width: "300px",
      },
    }
  );

  constructor() {}

  ngOnInit() {}
}
