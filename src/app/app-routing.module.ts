import { AuthGuard as PeyyaGuard } from "./guards/auth.guard";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RoutesName, Routes as PeyyaRoutes } from "@/enums/routes";
import { MainComponent } from "./routes/main/main.component";

const routes: Routes = [
  {
    path: PeyyaRoutes[RoutesName.main].route,
    component: MainComponent,
    loadChildren: () =>
      import("./routes/main/main.module").then((m) => m.MainModule),
    canActivate: [PeyyaGuard],
  },
  {
    path: PeyyaRoutes[RoutesName.login].route,
    loadChildren: () =>
      import("./routes/login/login.module").then((m) => m.LoginModule),
    canActivate: [PeyyaGuard],
  },
  {
    path: "**",
    redirectTo: PeyyaRoutes[RoutesName.main].route,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
