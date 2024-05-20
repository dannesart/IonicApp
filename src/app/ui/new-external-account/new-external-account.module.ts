import { IonicModule } from "@ionic/angular";
import { NewExternalAccountComponent } from "./new-external-account.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputModule } from "@/ui/input/input.module";

@NgModule({
  imports: [CommonModule, IonicModule, InputModule],
  exports: [NewExternalAccountComponent],
  declarations: [NewExternalAccountComponent],
})
export class NewExternalAccountsModule {}
