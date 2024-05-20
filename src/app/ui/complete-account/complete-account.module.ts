import { InputModule } from "@/ui/input/input.module";
import { CompleteAccountComponent } from "./complete-account.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderModule } from "@/ui/header/header.module";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, InputModule],
  declarations: [CompleteAccountComponent],
  exports: [CompleteAccountComponent],
})
export class CompleteAccountModule {}
