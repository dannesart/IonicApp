import { UtilsModule } from "@/utils";
import { IonicModule } from "@ionic/angular/";
import { KYCComponent } from "./kyc.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [CommonModule, IonicModule, UtilsModule],
  exports: [KYCComponent],
  declarations: [KYCComponent],
})
export class KYCModule {}
