import { Component, NgZone } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";

import { RecaptchaComponent, RecaptchaLoaderService, RecaptchaValueAccessorDirective } from "..";
import { MockRecaptchaLoaderService } from "./test-utils/mock-recaptcha-loader.service";

describe("RecaptchaValueAccessorDirective -> [(ngModel)]", () => {
  @Component({
    template: `
      <form #captchaForm="ngForm">
        <re-captcha [(ngModel)]="formModel.captcha" name="captcha" #captcha="ngModel"></re-captcha>
        <div *ngIf="captcha.pristine" captcha-pristine></div>
      </form>
    `,
  })
  class TestComponent {
    public formModel: { captcha: string | null } = { captcha: null };
  }

  let fixture: ComponentFixture<TestComponent>;
  let mockRecaptchaLoaderService: MockRecaptchaLoaderService;

  beforeEach(async () => {
    mockRecaptchaLoaderService = new MockRecaptchaLoaderService();
    await TestBed.configureTestingModule({
      declarations: [RecaptchaValueAccessorDirective, RecaptchaComponent, TestComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: RecaptchaLoaderService,
          useValue: mockRecaptchaLoaderService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    mockRecaptchaLoaderService.init();
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it("should consider form control pristine initially", () => {
    // Arrange

    // Act

    // Assert
    expect(fixture.debugElement.queryAll(By.css("[captcha-pristine]"))).toHaveSize(1);
  });

  it("should consider form control dirty after it has been resolved", () => {
    // Arrange

    // Act
    mockRecaptchaLoaderService.grecaptchaMock.emitGrecaptchaResponse("test response");
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.formModel.captcha).toEqual("test response");
    expect(fixture.debugElement.queryAll(By.css("[captcha-pristine]"))).toHaveSize(0);
  });

  it("should be able to reset grecaptcha control using falsy value after it has been resolved", async () => {
    // Arrange

    // Act
    mockRecaptchaLoaderService.grecaptchaMock.emitGrecaptchaResponse("test response");
    fixture.detectChanges();

    mockRecaptchaLoaderService.grecaptchaMock.reset.calls.reset();
    fixture.componentInstance.formModel.captcha = "";
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(mockRecaptchaLoaderService.grecaptchaMock.reset).toHaveBeenCalled();
  });

  it("should not reset grecaptcha control upon setting form control value to a truthy value", () => {
    // Arrange

    // Act
    mockRecaptchaLoaderService.grecaptchaMock.reset.calls.reset();
    mockRecaptchaLoaderService.grecaptchaMock.emitGrecaptchaResponse("test response");
    fixture.detectChanges();
    fixture.componentInstance.formModel.captcha = "some value";
    fixture.detectChanges();

    // Assert
    expect(mockRecaptchaLoaderService.grecaptchaMock.reset).not.toHaveBeenCalled();
  });

  it("should not fail if 'onResolve' is invoked prior to callbacks being registered", () => {
    // Arrange
    const directive = new RecaptchaValueAccessorDirective(
      new RecaptchaComponent(
        { nativeElement: document.createElement("div") },
        // @ts-expect-error this is an expected type mismatch
        new MockRecaptchaLoaderService(),
        new NgZone({})
      )
    );

    // Act + Assert
    expect(() => directive.onResolve("test value")).not.toThrow();
  });
});

describe("RecaptchaValueAccessorDirective -> formGroup", () => {
  @Component({
    template: `
      <form [formGroup]="formGroup" *ngIf="(loading$ | async) === false">
        <re-captcha formControlName="captcha"></re-captcha>
      </form>
    `,
  })
  class TestComponent {
    public loading$ = new BehaviorSubject<boolean>(false);
    public formGroup = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      captcha: new FormControl(null, [Validators.required]),
    });

    public testHideForm(): void {
      this.loading$.next(true);
    }

    public testShowForm(): void {
      this.loading$.next(false);
    }

    public testSetCaptchaControlValue(value: string | null): void {
      this.formGroup.setValue({ captcha: value });
    }

    public testGetCaptchaControlValue(): string | null {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.formGroup.controls["captcha"].value;
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let mockRecaptchaLoaderService: MockRecaptchaLoaderService;

  beforeEach(async () => {
    mockRecaptchaLoaderService = new MockRecaptchaLoaderService();
    await TestBed.configureTestingModule({
      declarations: [RecaptchaValueAccessorDirective, RecaptchaComponent, TestComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: RecaptchaLoaderService,
          useValue: mockRecaptchaLoaderService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    mockRecaptchaLoaderService.init();
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it("should not try to reset the component if it has been destroyed already", () => {
    // Arrange
    mockRecaptchaLoaderService.grecaptchaMock.emitGrecaptchaResponse("test response");
    fixture.detectChanges();

    // Act
    fixture.componentInstance.testHideForm();
    fixture.detectChanges();

    expect(fixture.componentInstance.testGetCaptchaControlValue()).toEqual("test response");
    mockRecaptchaLoaderService.grecaptchaMock.reset.calls.reset(); // the "onDestroy" resets the captcha

    fixture.componentInstance.testSetCaptchaControlValue(null);
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.testGetCaptchaControlValue()).toBeFalsy();
    expect(mockRecaptchaLoaderService.grecaptchaMock.reset).not.toHaveBeenCalled();
  });

  it("should reset the host if the control value written does not represent grecaptcha state", () => {
    // Arrange
    mockRecaptchaLoaderService.grecaptchaMock.emitGrecaptchaResponse("test response");
    fixture.detectChanges();

    // Act
    fixture.componentInstance.testHideForm();
    fixture.detectChanges();
    expect(fixture.componentInstance.testGetCaptchaControlValue()).toEqual("test response");
    fixture.componentInstance.testShowForm();
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.testGetCaptchaControlValue()).toBeFalsy();
    expect(mockRecaptchaLoaderService.grecaptchaMock.reset).toHaveBeenCalled();
  });
});
