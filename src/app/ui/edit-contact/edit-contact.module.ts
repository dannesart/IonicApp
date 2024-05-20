import { IonicModule } from "@ionic/angular";
import { EditContactComponent } from "./edit-contact.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputModule } from "@/ui/input/input.module";

@NgModule({
  imports: [CommonModule, IonicModule, InputModule],
  exports: [EditContactComponent],
  declarations: [EditContactComponent],
})
export class EditContactModule {}
