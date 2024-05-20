import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Routes as PeyyaRoutes, RoutesName } from "@/enums/routes";

const routes: Routes = [
  {
    path: PeyyaRoutes[RoutesName.home].route,
    redirectTo: PeyyaRoutes[RoutesName.wallet].route,
    pathMatch: "full",
  },
  {
    path: PeyyaRoutes[RoutesName.onboarding].route,
    loadChildren: () =>
      import("@/routes/onboarding/onboarding.module").then(
        (m) => m.OnboardingModule
      ),
  },
  {
    path: PeyyaRoutes[RoutesName.wallet].route,

    loadChildren: () =>
      import("@/routes/wallet/wallet.module").then((m) => m.WalletModule),
  },
  {
    path: PeyyaRoutes[RoutesName.contracts].route,
    loadChildren: () =>
      import("@/routes/contracts/contracts.module").then(
        (m) => m.ContractsModule
      ),
  },
  {
    path: PeyyaRoutes[RoutesName.send].route,
    loadChildren: () =>
      import("@/routes/send/send.module").then((m) => m.SendModule),
  },
  {
    path: PeyyaRoutes[RoutesName.recieve].route,
    loadChildren: () =>
      import("@/routes/recieve/recieve.module").then((m) => m.RecieveModule),
  },
  {
    path: PeyyaRoutes[RoutesName.instructions].route,
    loadChildren: () =>
      import("@/routes/instructions/instructions.module").then(
        (m) => m.InstructionsModule
      ),
  },
  {
    path: PeyyaRoutes[RoutesName.contacts].route,
    loadChildren: () =>
      import("@/routes/contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: PeyyaRoutes[RoutesName.profile].route,
    loadChildren: () =>
      import("@/routes/profile/profile.module").then((m) => m.profileModule),
  },
  {
    path: PeyyaRoutes[RoutesName.error].route,
    loadChildren: () =>
      import("@/routes/error/error.module").then((m) => m.ErrorPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
