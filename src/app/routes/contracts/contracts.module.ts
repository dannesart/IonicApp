import { FooterModule } from "@/ui/footer/header.module";
import { IonicModule } from "@ionic/angular/";
import { ContractsComponent } from "./contracts.component";
import { ContractsRoutingModule } from "./contracts-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NewContractModule } from "@/ui/new-contract/new-contract.module";
import { MiniContractModule } from "@/ui/mini-contract/mini-contract.module";

@NgModule({
  imports: [
    CommonModule,
    ContractsRoutingModule,
    IonicModule,
    FooterModule,
    NewContractModule,
    MiniContractModule,
  ],
  exports: [ContractsComponent],
  declarations: [ContractsComponent],
})
export class ContractsModule {}
