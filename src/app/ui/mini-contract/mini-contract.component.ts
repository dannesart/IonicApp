import { ContractStatus } from "@/utils/contract";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "mini-contract",
  templateUrl: "./mini-contract.component.html",
  styleUrls: ["./mini-contract.component.scss"],
})
export class MiniContractComponent implements OnInit {
  @Input() contract;

  constructor() {}

  iconByStatus(status: ContractStatus) {
    let icon;
    return "layers-outline";
    // switch(status){
    //   case ContractStatus.:
    // }
  }

  ngOnInit() {}
}
