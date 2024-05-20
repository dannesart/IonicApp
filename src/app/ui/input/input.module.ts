import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { InputComponent } from "./input.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  exports: [InputComponent],
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class InputModule {}
