import { ContractStatus, IContract } from "@/utils/contract";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "@environments/environment";
import { BehaviorSubject, of } from "rxjs";
import { filter, map, mergeMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

interface IContractsState {
  getting: boolean;
  creating: boolean;
  contracts: IContract[];
  error: string;
}

@Injectable({
  providedIn: "root",
})
export class ContractService implements OnInit {
  private state$: BehaviorSubject<IContractsState> = new BehaviorSubject<IContractsState>(
    {
      getting: false,
      creating: false,
      contracts: [],
      error: null,
    }
  );
  private contracts$ = new BehaviorSubject<IContract[]>(null);

  // Fetch
  private fetch = async (userId: string) => {
    this.updateContract({ error: null });
    try {
      const response = this.http
        .get(
          `${environment.API.API_HOST}${environment.API.API_TRANSACTIONS}/${userId}/holds`,
          {}
        )
        .pipe(
          mergeMap((response: any) => {
            this.updateContract({ contracts: response });
            return response;
          })
        )
        .toPromise();
      return response;
    } catch (error) {
      this.updateContract({
        error: "Couldn´t get contracts. Please reload to try again.",
      });
      throw error;
    }
  };

  /**
   * Update contract. Updates the contract state observable with new data.
   */
  public updateContract = async (newState: { [key: string]: any }) => {
    this.state$.next({ ...this.state$.value, ...newState });
  };

  // Create contract
  public create = async (data) => {
    try {
      let response;
      const sub = this.auth
        .getProfileStateAsObservable()
        .pipe(take(1))
        .subscribe(async ({ id }) => {
          try {
            response = this.http
              .post(
                `${environment.API.API_HOST}${environment.API.API_TRANSACTIONS}/${id}/holds`,
                data
              )
              .toPromise();
          } catch (error) {
            throw error;
          }
          sub.unsubscribe();
          return response;
        });
    } catch (error) {
      throw error;
    }
  };

  // Sign contract

  // End contract

  // Get contract
  public getContract = async (id: string) => {
    return this.contracts$.value.find((contract) => contract.name === id);
  };

  /**
   * Get wallet. Returns wallet state as an observable.
   * Subscribe will return IWallet model.
   */
  public getContracts$ = () => {
    return this.state$.asObservable().pipe(
      map((contractsObject) => {
        contractsObject.contracts = contractsObject.contracts.filter(
          (contract) => {
            if (contract.status === ContractStatus.released_by_notary) {
              return true;
            }
            return false;
          }
        );

        return contractsObject;
      })
    );
  };

  public triggerFetch = async () => {
    try {
      await this.updateContract({ getting: true });
      const sub = this.auth
        .getProfileStateAsObservable()
        .pipe(take(1))
        .subscribe(async ({ id }) => {
          try {
            await this.fetch(id);
          } catch (error) {
            throw error;
          }
          await this.updateContract({ getting: false });
          sub.unsubscribe();
        });
    } catch (error) {
      throw error;
    }
  };

  async ngOnInit() {}

  constructor(public http: HttpClient, public auth: AuthService) {}
}
