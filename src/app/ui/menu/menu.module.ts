import { IonicModule } from "@ionic/angular/";
import { MenuComponent } from "./menu.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [MenuComponent],
  declarations: [MenuComponent],
})
export class MenuModule {}
