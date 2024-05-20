import { IonicModule } from "@ionic/angular/";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsComponent } from "./settings.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
})
export class SettingsModule {}
