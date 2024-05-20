import { IonicModule } from "@ionic/angular";
import { MiniTransferComponent } from "./mini-transfer.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  exports: [MiniTransferComponent],
  declarations: [MiniTransferComponent],
  imports: [CommonModule, IonicModule],
})
export class MiniTransferModule {}
