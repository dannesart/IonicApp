import { InputModule } from "@/ui/input/input.module";
import { VerifyPhoneComponent } from "./verify-phone.component";
import { IonicModule } from "@ionic/angular/";
import { HeaderModule } from "@/ui/header/header.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HeaderModule, InputModule],
  declarations: [VerifyPhoneComponent],
  exports: [VerifyPhoneComponent],
})
export class VerifyPhoneModule {}
