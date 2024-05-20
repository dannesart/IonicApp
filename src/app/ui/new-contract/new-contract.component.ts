import { UsersService } from "@/services/users.service";
import { ContractService } from "@/services/contract.service";
import { BehaviorSubject } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-new-contract",
  templateUrl: "./new-contract.component.html",
  styleUrls: ["./new-contract.component.scss"],
})
export class NewContractComponent implements OnInit, OnDestroy {
  /**
   * States
   */
  public description$ = new BehaviorSubject(null);
  public targetPeyya$ = new BehaviorSubject(null);
  public amount$ = new BehaviorSubject(null);
  public expirationDate$ = new BehaviorSubject(null);
  public contract$ = this.contract.getContracts$();

  /**
   * Methods
   */
  updateValue = async ($event, field) => {
    if (field === "description") {
      this.description$.next($event.value || $event.target.value);
    }
    if (field === "amount") {
      this.amount$.next($event.value || $event.target.value);
    }
    if (field === "targetPeyya") {
      this.targetPeyya$.next($event.value || $event.target.value);
    }
    if (field === "expirationDate") {
      this.expirationDate$.next($event.value || $event.target.value);
    }
  };

  // Create contract
  createContract = async () => {
    await this.contract.updateContract({ error: null, creating: true });
    try {
      const targetUser = await this.user.getRecipientBasedOnPhone(
        this.targetPeyya$.value
      );
      if (!targetUser.length) {
        throw new Error("No valid user");
      }
      const data = {
        amount: this.amount$.value,
        expirationDate: this.expirationDate$.value,
        concept: this.description$.value,
        targetPeyya: targetUser[0]._id || targetUser[0].id,
      };

      await this.contract.create(data);
      await this.contract.updateContract({ creating: false });
    } catch (error) {
      console.log("Error while creating contract", error);
      await this.contract.updateContract({ error, creating: false });
    }
  };

  /**
   * Subs
   */

  /**
   * Close modal. This can be triggered by close button in the top right corner. or
   * By close button in the bottom.
   */
  close = async () => {
    await this.reset();
    await this.modalController.dismiss(undefined, undefined, "new-contract-in");
  };

  /**
   * Reset the state. This will simply reset all forms and states.
   * This will be triggerd while loading and closing.
   */
  reset = async () => {};

  constructor(
    private modalController: ModalController,
    private contract: ContractService,
    private user: UsersService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
