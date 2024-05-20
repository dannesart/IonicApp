import { InputModule } from "@/ui/input/input.module";
import { IonicModule } from "@ionic/angular/";
import { CashInComponent } from "./cash-in.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UtilsModule } from "@/utils";

@NgModule({
  imports: [CommonModule, IonicModule, UtilsModule, InputModule],
  exports: [CashInComponent],
  declarations: [CashInComponent],
})
export class CashInModule {}
