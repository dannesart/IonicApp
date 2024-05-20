import { ConnectBankModule } from "./../../ui/connect-bank/connect-bank.module";
import { MiniTransferModule } from "@/ui/mini-transfer/mini-transfer.module";
import { IonicModule } from "@ionic/angular/";
import { WalletComponent } from "./wallet.component";
import { WalletRoutingModule } from "./wallet-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CashInModule } from "@/ui/cash-in/cash-in.module";
import { CashOutModule } from "@/ui/cash-out/cash-out.module";
import { TransactionInformationModule } from "@/ui/transaction-information/transaction-information.module";
import { WalletInformationModule } from "@/ui/wallet-information/wallet-information.module";
import { UtilsModule } from "@/utils";
import { RouterModule } from "@angular/router";
import { LoaderModule } from "@/ui/loader/loader.module";

@NgModule({
  imports: [
    CommonModule,
    WalletRoutingModule,
    IonicModule,
    CashInModule,
    CashOutModule,
    ConnectBankModule,
    UtilsModule,
    LoaderModule,
    TransactionInformationModule,
    WalletInformationModule,
    MiniTransferModule,
    RouterModule,
  ],
  exports: [WalletComponent],
  declarations: [WalletComponent],
})
export class WalletModule {}
