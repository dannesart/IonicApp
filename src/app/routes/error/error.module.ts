import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ErrorPage } from "./error.page";

import { ErrorPageRoutingModule } from "./error-routing.module";
import { ImageModule } from "@/ui/image/image.module";

@NgModule({
  imports: [CommonModule, IonicModule, ErrorPageRoutingModule, ImageModule],
  declarations: [ErrorPage],
})
export class ErrorPageModule {}
