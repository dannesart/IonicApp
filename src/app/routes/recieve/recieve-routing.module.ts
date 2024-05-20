import { RecieveComponent } from "./recieve.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Routes as PeyyaRoutes } from "@/enums/routes";

const routes: Routes = [
  {
    path: "",
    component: RecieveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecieveRoutingModule {}
