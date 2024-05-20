import { InputModule } from "@/ui/input/input.module";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { StepsModule } from "./steps/steps.module";

import { ImageModule } from "@/ui/image/image.module";
import { HeaderModule } from "@/ui/header/header.module";
import { VerifyPhoneModule } from "@/ui/verify-phone/verify-phone.module";
import { LoaderModule } from "@/ui/loader/loader.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoaderModule,
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    IonicModule,
    ImageModule,
    StepsModule,
    HeaderModule,
    VerifyPhoneModule,
    InputModule,
  ],
})
export class LoginModule {}
