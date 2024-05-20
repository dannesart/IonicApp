import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular/";
import { NewPaymentComponent } from "./new-payment.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UtilsModule } from "@/utils";
import { InputModule } from "@/ui/input/input.module";

@NgModule({
  imports: [CommonModule, IonicModule, UtilsModule, InputModule, FormsModule],
  exports: [NewPaymentComponent],
  declarations: [NewPaymentComponent],
})
export class NewPaymentModule {}
