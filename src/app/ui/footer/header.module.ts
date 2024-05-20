import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer.component";
import { NgModule } from "@angular/core";

@NgModule({
  exports: [FooterComponent],
  declarations: [FooterComponent],
  imports: [CommonModule, IonicModule],
})
export class FooterModule {}
