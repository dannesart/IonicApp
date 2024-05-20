import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ExternalAccountsComponent } from "./external-accounts.component";

describe("ExternalAccountsComponent", () => {
  let component: ExternalAccountsComponent;
  let fixture: ComponentFixture<ExternalAccountsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExternalAccountsComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
