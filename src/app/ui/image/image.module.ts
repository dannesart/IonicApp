import { IonicModule } from "@ionic/angular/";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageComponent } from "./image.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ImageComponent],
  exports: [ImageComponent],
})
export class ImageModule {}
