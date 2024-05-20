import { Observable } from "rxjs";
import { User } from "@/schemas/user";
import { AuthService } from "@/services/auth.service";
import { UsersService } from "@/services/users.service";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  public async logOut() {
    try {
      this.auth.logout();
    } catch (error) {
      // Handle log out error
    }
  }

  /**
   * Close modal. This can be triggered by close button in the top right corner. or
   * By close button in the bottom.
   */
  close = async () => {
    this.modalController.dismiss({
      dismissed: true,
    });
  };

  constructor(
    private auth: AuthService,
    private userService: UsersService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {}
}
