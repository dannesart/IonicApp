import { ProfileComponent } from "./profile.component";
import { profileRoutingModule } from "./profile-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SettingsModule } from "@/ui/settings/settings.module";
import { ExternalAccountsModule } from "@/ui/external-accounts/external-accounts.module";
import { KYCModule } from "@/ui/kyc/kyc.module";

@NgModule({
  imports: [
    CommonModule,
    profileRoutingModule,
    IonicModule,
    SettingsModule,
    ExternalAccountsModule,
    KYCModule,
  ],
  exports: [ProfileComponent],
  declarations: [ProfileComponent],
})
export class profileModule {}
