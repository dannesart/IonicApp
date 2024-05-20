import { map } from "rxjs/operators";
import { ITransaction } from "./../schemas/transactions";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private state$: BehaviorSubject<ITransaction[]> = new BehaviorSubject<
    ITransaction[]
  >([]);

  // Get transactions
  public getTransactions$ = () => {
    return this.state$.asObservable();
  };

  // Update transaction state
  public updateTransactions = (newState: ITransaction[]) => {
    this.state$.next(newState);
  };

  // Get transaction history
  public getTransactionHistory = async () => {
    try {
      const response = await this.http
        .get(
          `${environment.API.API_HOST}${environment.API.API_TRANSACTIONS}/history`,
          {
            params: {
              amount: 3,
            },
          }
        )
        .pipe(
          map((response: any) => {
            if (response) {
              this.updateTransactions(response.data || response);
            }
            return response;
          })
        )
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Create transaction
  public createTransaction = async (userId, targetUserId, amount, message) => {
    try {
      const response = await this.http
        .post(
          `${environment.API.API_HOST}${environment.API.API_TRANSACTIONS}/${userId}/transfer`,
          {
            amount,
            targetPeyyaUserid: targetUserId,
            message,
          },
          { observe: "response" }
        )
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  };

  public sendMoney = async (
    recipinetPhoneNumber,
    amount,
    message,
    currency
  ) => {
    try {
      const response = await this.http
        .post(
          `${environment.API.API_HOST}${environment.API.API_TRANSACTIONS}/send`,
          {
            amount: JSON.stringify(amount),
            targetPhoneNumber: recipinetPhoneNumber,
            message,
            currency,
          },
          { observe: "response" }
        )
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  };

  public getTypeName = (type) => {
    switch (type) {
      case "CARD_CASHIN":
        return "Deposit";
      case "BANK_ACCOUNT_CASHOUT":
        return "Withdraw";
      default:
        return "Transfer";
    }
  };

  // Get Icon
  public getTypeIcon = (type) => {
    switch (type) {
      case "CARD_CASHIN":
        return {
          icon: "arrow-forward-outline",
          color: "success",
        };
      case "BANK_ACCOUNT_CASHOUT":
        return {
          icon: "arrow-back-outline",
          color: "danger",
        };
      default:
        return {
          icon: "arrow-forward-outline",
          color: "medium",
        };
    }
  };

  constructor(private http: HttpClient) {}
}
