import { ContractStatus } from "@/utils/contract";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "mini-transfer",
  templateUrl: "./mini-transfer.component.html",
  styleUrls: ["./mini-transfer.component.scss"],
})
export class MiniTransferComponent implements OnInit {
  @Input() transfer;

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
