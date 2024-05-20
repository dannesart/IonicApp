/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from "@angular/core/testing";
import { PageService } from "./page.service";

describe("Service: Page", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageService],
      teardown: { destroyAfterEach: false },
    });
  });

  it("should ...", inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));
});
