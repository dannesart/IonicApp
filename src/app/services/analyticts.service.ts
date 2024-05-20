import { Injectable } from "@angular/core";

declare var pendo;

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  public initPendo = (peyyaId: string) => {
    pendo.initialize({
      visitor: {
        id: peyyaId, // Required if user is logged in, default creates anonymous ID
        // email:        // Recommended if using Pendo Feedback, or NPS Email
        // full_name:    // Recommended if using Pendo Feedback
        // role:         // Optional

        // You can add any additional visitor level key-values here,
        // as long as it's not one of the above reserved names.
      },
    });
  };

  constructor() {}
}
