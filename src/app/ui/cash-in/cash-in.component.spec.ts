import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CashInComponent } from "./cash-in.component";

describe("WalletComponent", () => {
  let component: CashInComponent;
  let fixture: ComponentFixture<CashInComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CashInComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CashInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
