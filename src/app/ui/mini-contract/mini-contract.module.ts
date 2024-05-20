import { IonicModule } from "@ionic/angular";
import { MiniContractComponent } from "./mini-contract.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  exports: [MiniContractComponent],
  declarations: [MiniContractComponent],
  imports: [CommonModule, IonicModule],
})
export class MiniContractModule {}
