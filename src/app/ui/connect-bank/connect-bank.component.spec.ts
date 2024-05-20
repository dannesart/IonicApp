import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ConnectBankComponent } from "./connect-bank.component";

describe("ConnectBankComponent", () => {
  let component: ConnectBankComponent;
  let fixture: ComponentFixture<ConnectBankComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConnectBankComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
