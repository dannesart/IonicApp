import { InputModule } from "@/ui/input/input.module";
import { UtilsModule } from "@/utils";
import { IonicModule } from "@ionic/angular/";
import { NewContractComponent } from "./new-contract.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [CommonModule, IonicModule, UtilsModule, InputModule],
  exports: [NewContractComponent],
  declarations: [NewContractComponent],
})
export class NewContractModule {}
