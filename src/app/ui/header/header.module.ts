import { MenuModule } from "./../menu/menu.module";
import { ImageModule } from "@/ui/image/image.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { NgModule } from "@angular/core";

@NgModule({
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  imports: [CommonModule, IonicModule, ImageModule, MenuModule],
})
export class HeaderModule {}
