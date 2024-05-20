import { IonicModule } from "@ionic/angular";
import { OnboardingComponent } from "./onboarding.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CompleteAccountModule } from "@/ui/complete-account/complete-account.module";
import { VerifyPhoneModule } from "@/ui/verify-phone/verify-phone.module";
import { HeaderModule } from "../header/header.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    CompleteAccountModule,
    VerifyPhoneModule,
  ],
  declarations: [OnboardingComponent],
  exports: [OnboardingComponent],
})
export class OnboardingModule {}
