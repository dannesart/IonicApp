import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading.component";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class LoadingModule {}
