import { FilterPipe } from "./filter";
import { SafePipe } from "./safe.pipe";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SafePipe, FilterPipe],
  exports: [SafePipe, FilterPipe],
})
export class UtilsModule {}
