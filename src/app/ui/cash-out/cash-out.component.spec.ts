import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CashOutComponent } from "./cash-out.component";

describe("WalletComponent", () => {
  let component: CashOutComponent;
  let fixture: ComponentFixture<CashOutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CashOutComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CashOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
