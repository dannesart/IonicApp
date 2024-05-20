import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { FooterModule } from "@/ui/footer/header.module";
import { ImageModule } from "@/ui/image/image.module";
import { NewPaymentModule } from "@/ui/new-payment/new-payment.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NewPaymentModule,
    FooterModule,
    ImageModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
