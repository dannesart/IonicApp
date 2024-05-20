import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
//const callbackUri = `${config.appId}://dev-ibqj5g5m.us.auth0.com/capacitor/${config.appId}/callback`;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public ngZone: NgZone,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
  }
}
