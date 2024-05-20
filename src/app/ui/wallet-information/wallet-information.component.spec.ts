import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { WalletInformationComponent } from "./wallet-information.component";

describe("WalletComponent", () => {
  let component: WalletInformationComponent;
  let fixture: ComponentFixture<WalletInformationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WalletInformationComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
