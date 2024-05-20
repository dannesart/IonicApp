import { IonicModule } from "@ionic/angular/";
import { TransactionInformationComponent } from "./transaction-information.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [TransactionInformationComponent],
  declarations: [TransactionInformationComponent],
})
export class TransactionInformationModule {}
