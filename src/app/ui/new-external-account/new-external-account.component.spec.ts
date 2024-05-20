/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { NewExternalAccountComponent } from "./new-external-account.component";

describe("NewExternalAccountComponent", () => {
  let component: NewExternalAccountComponent;
  let fixture: ComponentFixture<NewExternalAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewExternalAccountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExternalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
