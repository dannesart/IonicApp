import { UtilsModule } from "@/utils";
import { IonicModule } from "@ionic/angular/";
import { ExternalAccountsComponent } from "./external-accounts.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NewExternalAccountsModule } from "@/ui/new-external-account/new-external-account.module";

@NgModule({
  imports: [CommonModule, IonicModule, UtilsModule, NewExternalAccountsModule],
  exports: [ExternalAccountsComponent],
  declarations: [ExternalAccountsComponent],
})
export class ExternalAccountsModule {}
