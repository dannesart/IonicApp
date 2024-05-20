import { InputModule } from "@/ui/input/input.module";
import { IonicModule } from "@ionic/angular/";
import { SendComponent } from "./send.component";
import { SendRoutingModule } from "./send-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CashInModule } from "@/ui/cash-in/cash-in.module";
import { UtilsModule } from "@/utils";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    SendRoutingModule,
    IonicModule,
    CashInModule,
    UtilsModule,
    RouterModule,
    InputModule,
  ],
  exports: [SendComponent],
  declarations: [SendComponent],
})
export class SendModule {}
