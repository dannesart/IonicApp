import { ConnectBankModule } from "../../ui/connect-bank/connect-bank.module";
import { MiniTransferModule } from "@/ui/mini-transfer/mini-transfer.module";
import { IonicModule } from "@ionic/angular/";
import { RecieveComponent } from "./recieve.component";
import { RecieveRoutingModule } from "./recieve-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CashInModule } from "@/ui/cash-in/cash-in.module";
import { CashOutModule } from "@/ui/cash-out/cash-out.module";
import { TransactionInformationModule } from "@/ui/transaction-information/transaction-information.module";
import { WalletInformationModule } from "@/ui/wallet-information/wallet-information.module";
import { UtilsModule } from "@/utils";
import { RouterModule } from "@angular/router";
import { QrCodeModule } from "ng-qrcode";
import { InputModule } from "@/ui/input/input.module";

@NgModule({
  imports: [
    CommonModule,
    QrCodeModule,
    RecieveRoutingModule,
    IonicModule,
    CashInModule,
    UtilsModule,
    RouterModule,
    InputModule,
  ],
  exports: [RecieveComponent],
  declarations: [RecieveComponent],
})
export class RecieveModule {}
