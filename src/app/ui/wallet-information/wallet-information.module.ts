import { IonicModule } from "@ionic/angular/";
import { WalletInformationComponent } from "./wallet-information.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [WalletInformationComponent],
  declarations: [WalletInformationComponent],
})
export class WalletInformationModule {}
