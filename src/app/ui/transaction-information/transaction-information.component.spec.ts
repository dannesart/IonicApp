import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TransactionInformationComponent } from "./transaction-information.component";

describe("WalletComponent", () => {
  let component: TransactionInformationComponent;
  let fixture: ComponentFixture<TransactionInformationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TransactionInformationComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
