import { FooterModule } from "./../../ui/footer/header.module";
import { IonicModule } from "@ionic/angular/";
import { MainRoutingModule } from "./main-routing.module";
import { RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderModule } from "@/ui/header/header.module";
import { fancyAnimation } from "@/extras/animations";
import { OnboardingModule } from "@/ui/onboarding/onboarding.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    MainRoutingModule,
    HeaderModule,
    FooterModule,
    OnboardingModule,
    IonicModule.forRoot({
      navAnimation: fancyAnimation,
    }),
  ],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
