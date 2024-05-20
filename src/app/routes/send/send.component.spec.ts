import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SendComponent } from "./send.component";

describe("WalletComponent", () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SendComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
