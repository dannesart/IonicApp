import { getRoute, RoutesName } from "@/enums/routes";
import { AuthService } from "@/services/auth.service";
import { PageService } from "@/services/page.service";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-verify-phone",
  templateUrl: "./verify-phone.component.html",
  styleUrls: ["./verify-phone.component.scss"],
})
export class VerifyPhoneComponent implements OnInit {
  @ViewChild("code1") code1: ElementRef;
  @ViewChild("code2") code2: ElementRef;
  @ViewChild("code3") code3: ElementRef;
  @ViewChild("code4") code4: ElementRef;

  @Output("onComplete") onComplete = new EventEmitter();
  @Output("onError") onError = new EventEmitter();

  public verificationCode$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public sendingNewRequest$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public sendingNewRequestError$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  public sendingVerification$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public sendingVerificationError$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );

  public handleCodeInput($event, idx) {
    const value = $event.target.value;
    const next = this[`code${idx + 1}`];
    const prev = this[`code${idx - 1}`];
    if (value) {
      if (next) {
        next.nativeElement.focus();
      }
    } else {
      if (prev) {
        prev.nativeElement.focus();
      }
    }
    if (this.canVerify()) {
      this.handleClick("verify");
    }
  }

  private getCode = () => {
    if (this.code1) {
      const value1 = this.code1.nativeElement.value;
      const value2 = this.code2.nativeElement.value;
      const value3 = this.code3.nativeElement.value;
      const value4 = this.code4.nativeElement.value;

      return [value1, value2, value3, value4].join("").trim();
    }
  };

  public canVerify = () => {
    const code = this.getCode();
    const length = code.length;
    return this.getCode().length === 4;
  };

  public async handleClick(type: string) {
    if (type === "verify") {
      this.sendingVerificationError$.next(null);
      this.sendingVerification$.next(true);
      try {
        // TODO: Get phonenumber (ex. from service)
        const verification = await this.auth.sendVerificationCode(
          this.getCode(),
          "+XXXXXXXXXX"
        );
        this.sendingVerification$.next(false);
        this.onComplete.emit(true);
      } catch (error) {
        this.sendingVerificationError$.next(error);
        this.sendingVerification$.next(false);
        this.onError.emit(error);

        const toast = await this.toastController.create({
          message:
            "Could not verify your mobile right now. Please try again later",
          color: "danger",
          duration: 5000,
          position: "top",
        });

        toast.present();
      }
    }
  }

  constructor(
    public auth: AuthService,
    public page: PageService,
    private toastController: ToastController
  ) {
    // Set page information
    const route = getRoute(RoutesName.verifyPhone);

    page.setPage({
      title: route.title,
      hideFooter: route.hideFooter || false,
    });
  }

  ngOnInit() {}
}
