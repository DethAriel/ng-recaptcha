import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecaptchaComponent, RecaptchaLoaderService } from "..";

describe("RecaptchaComponent", () => {
  let component: RecaptchaComponent;
  let fixture: ComponentFixture<RecaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecaptchaComponent],
      providers: [{ provide: RecaptchaLoaderService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
