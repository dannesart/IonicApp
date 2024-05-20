import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PageService {
  page$ = new BehaviorSubject<any>({
    title: null,
    hideFooter: false,
  });

  public setPage = (patch: any) => {
    const page = this.getPage();
    this.page$.next({ ...page, ...patch });
  };

  public getPage = () => {
    return this.page$.value;
  };

  constructor() {}
}
