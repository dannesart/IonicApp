import { Component } from "@angular/core";
import { environment } from "@environments/environment";

@Component({
  selector: "ui-debugger",
  templateUrl: "./debugger.component.html",
})
export class DebuggerComponent {
  public showDebugger = false;
  public envs = environment;

  public toggleDebugger = () => {
    this.showDebugger = !this.showDebugger;
  };

  constructor() {}
}
