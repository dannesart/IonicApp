import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InstructionsRoutingModule } from "./instructions-routing.module";
import { ImageModule } from "@/ui/image/image.module";

@NgModule({
  imports: [CommonModule, ImageModule, InstructionsRoutingModule, IonicModule],
  declarations: [],
})
export class InstructionsModule {}
