import { IonicModule } from "@ionic/angular";
import { NewContactComponent } from "./new-contact.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputModule } from "@/ui/input/input.module";

@NgModule({
  imports: [CommonModule, IonicModule, InputModule],
  exports: [NewContactComponent],
  declarations: [NewContactComponent],
})
export class NewContactModule {}
