import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './v3-demo.component.html',
})
export class RecaptchaV3DemoComponent implements OnInit, OnDestroy {
  public recentToken: string = '';
  public readonly executionLog: OnExecuteData[] = [];

  private allExecutionsSubscription: Subscription;
  private singleExecutionSubscription: Subscription;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  public executeAction(action: string): void {
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
    this.singleExecutionSubscription = this.recaptchaV3Service.execute(action)
      .subscribe((token) => this.recentToken = token);
  }

  public ngOnInit() {
    this.allExecutionsSubscription = this.recaptchaV3Service.onExecute
      .subscribe((data) => this.executionLog.push(data));
  }

  public ngOnDestroy() {
    if (this.allExecutionsSubscription) {
      this.allExecutionsSubscription.unsubscribe();
    }
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
  }

  public formatToken(token: string): string {
    if (!token) {
      return '(empty)';
    }

    return `${token.substr(0, 7)}...${token.substr(-7)}`;
  }
}
