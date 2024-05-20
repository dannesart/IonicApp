import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { RecieveComponent } from "./recieve.component";

describe("WalletComponent", () => {
  let component: RecieveComponent;
  let fixture: ComponentFixture<RecieveComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RecieveComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
