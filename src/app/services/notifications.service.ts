import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

export interface INotification {
  message: string;
  id: string;
  read: boolean;
  area: string;
}

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  private _notifications: BehaviorSubject<
    INotification[]
  > = new BehaviorSubject<INotification[]>([]);
  public notifications$ = this._notifications.asObservable();

  public getNotis = (id?: string) => {
    const all = this._notifications.value;
    if (id) {
      return all.find((notis) => notis.id === id);
    }
    return all;
  };

  public getAllBasedOnArea = (area: string) => {
    const all = this._notifications.value;
    return all.filter((notis) => notis.area === area);
  };

  public setNewNotis = (id: string, area: string, message: string) => {
    if (!this.getNotis(id)) {
      const all = this.getNotis() as INotification[];
      const newNotis: INotification = {
        id,
        area,
        message,
        read: false,
      };
      this._notifications.next([newNotis, ...all]);
    }
  };

  public removeNotis = (id: string) => {
    if (this.getNotis(id)) {
      const all = [...(this.getNotis() as INotification[])];
      const filtered = all.filter((notis) => notis.id !== id);
      this._notifications.next([...filtered]);
    }
  };

  public setReadNotis = (id) => {
    if (!this.getNotis(id)) {
    }
  };

  public setUnreadNotis = (id) => {};

  constructor() {}
}
