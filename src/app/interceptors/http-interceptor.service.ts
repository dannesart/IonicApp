import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from "@/services/auth.service";
import { tap } from "rxjs/operators";
import { ToastController } from "@ionic/angular";
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const token = this.authService.token;
    req = req.clone({
      url: req.url,
      setHeaders: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });

    return next.handle(req).pipe(
      tap(
        () => {},
        async (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              if (
                err.status === 500 ||
                err.status === 417 ||
                err.status === 0
              ) {
                const toast = await this.toastController.create({
                  message: "An unexpected error seems to have appeared.",
                  color: "danger",
                  duration: 4000,
                  position: "top",
                });

                toast.present();
              }

              return;
            }
            this.authService.logout();
          }
        }
      )
    );
  }
}
