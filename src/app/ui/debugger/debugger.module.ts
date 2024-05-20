import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DebuggerComponent } from "./debugger.component";

@NgModule({
  imports: [CommonModule],
  declarations: [DebuggerComponent],
  exports: [DebuggerComponent],
})
export class DebuggerModule {}
