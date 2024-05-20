import { InputModule } from "@/ui/input/input.module";
import { IonicModule } from "@ionic/angular/";
import { CashOutComponent } from "./cash-out.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UtilsModule } from "@/utils";

@NgModule({
  imports: [CommonModule, IonicModule, UtilsModule, InputModule],
  exports: [CashOutComponent],
  declarations: [CashOutComponent],
})
export class CashOutModule {}
