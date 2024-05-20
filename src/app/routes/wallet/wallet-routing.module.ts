import { WalletComponent } from "./wallet.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Routes as PeyyaRoutes } from "@/enums/routes";

const routes: Routes = [
  {
    path: "",
    component: WalletComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {}
