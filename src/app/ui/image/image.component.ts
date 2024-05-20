import { Component, HostBinding, Input } from "@angular/core";

export interface IImage {
  url: string;
  tinyUrl?: string;
  sizes?: {
    width?: string;
    height?: string;
  };
}

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent {
  @Input() image: IImage;
  @HostBinding("style.width") width: string;
  @HostBinding("style.height") height: string;

  constructor() {}

  ngOnInit() {
    if (this.image) {
      if (this.image.sizes && this.image.sizes.width) {
        this.width = this.image.sizes.width;
      }
      if (this.image.sizes && this.image.sizes.height) {
        this.height = this.image.sizes.height;
      }
    }
  }
}
