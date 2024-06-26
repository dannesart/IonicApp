import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ContractsComponent } from "./contracts.component";

describe("ContractsComponent", () => {
  let component: ContractsComponent;
  let fixture: ComponentFixture<ContractsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContractsComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
