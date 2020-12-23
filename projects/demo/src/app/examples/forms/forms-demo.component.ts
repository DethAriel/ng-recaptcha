import { Component } from "@angular/core";

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: "recaptcha-demo",
  styles: [
    `
      .error {
        color: crimson;
      }
      .success {
        color: green;
      }
    `,
  ],
  templateUrl: "./forms-demo.component.html",
})
export class FormsDemoComponent {
  public formModel: FormModel = {};
}
