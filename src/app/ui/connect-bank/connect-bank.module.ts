import { InputModule } from "@/ui/input/input.module";
import { IonicModule } from "@ionic/angular/";
import { ConnectBankComponent } from "./connect-bank.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UtilsModule } from "@/utils";

@NgModule({
  imports: [CommonModule, IonicModule, UtilsModule, InputModule],
  exports: [ConnectBankComponent],
  declarations: [ConnectBankComponent],
})
export class ConnectBankModule {}
