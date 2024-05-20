import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { KYCComponent } from "./kyc.component";

describe("ExternalAccountsComponent", () => {
  let component: KYCComponent;
  let fixture: ComponentFixture<KYCComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [KYCComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
