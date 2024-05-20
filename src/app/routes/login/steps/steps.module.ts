import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InitModule } from "./init/init.module";
import { LoadingModule } from "./loading/loading.module";

@NgModule({
  imports: [CommonModule, InitModule, LoadingModule],
  declarations: [],
  exports: [InitModule, LoadingModule],
})
export class StepsModule {}
