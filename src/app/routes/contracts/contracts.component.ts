import { Observable } from "rxjs";
import { AuthService } from "@/services/auth.service";
import { ContractService } from "@/services/contract.service";
import { PageService } from "@/services/page.service";
import { NewContractComponent } from "@/ui/new-contract/new-contract.component";
import { Component, OnInit } from "@angular/core";
import { IonRouterOutlet, ModalController } from "@ionic/angular";

@Component({
  selector: "app-contracts",
  templateUrl: "./contracts.component.html",
  styleUrls: ["./contracts.component.scss"],
})
export class ContractsComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    public page: PageService,
    private routerOutlet: IonRouterOutlet,
    public contract: ContractService,
    public auth: AuthService
  ) {
    this.contracts$ = contract.getContracts$();
  }

  /**
   * Contracts
   */
  public contracts$: Observable<any>;

  /**
   * On drag down. Trigger a new fetch of wallet.
   * And on successfuly fetch. Trigger event complete.
   */
  doRefresh = async (event) => {
    try {
      await this.contract.triggerFetch();
    } catch (error) {}

    event.target.complete();
  };

  /**
   * Open up a modal with cash in.
   * user should be able to open a modal and insert money to their peyya wallet.
   * This should be easy and clean. User can always cancel this process by cancel it.
   */
  presentNewContractModal = async () => {
    const modal = await this.modalController.create({
      component: NewContractComponent,
      cssClass: "new-contract-in",
      id: "new-contract-in",
      swipeToClose: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  };

  ngOnInit() {}
}
