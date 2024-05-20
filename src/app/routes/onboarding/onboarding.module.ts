import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OnboardingRoutingModule } from "./onboarding-routing.module";

import { OnboardingComponent } from "./onboarding.component";
import { InputModule } from "@/ui/input/input.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingRoutingModule,
    InputModule,
  ],
  declarations: [OnboardingComponent],
})
export class OnboardingModule {}
