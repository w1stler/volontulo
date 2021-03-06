import { Component, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RedirectComponent } from 'app/components/redirect/redirect.component';
import { RegisterRequestModel } from 'app/models/auth.models';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'volontulo-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerModel: RegisterRequestModel = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  honeyBunny = '';
  ACCEPT_TERMS = 'Wyrażam zgodę na przetwarzanie moich danych osobowych';
  registrationSuccessful = false;
  userIsAuthenticated = false;

  @ViewChild('checkboxTA') public checkboxTA: NgControl;

  checkPasswords(): boolean {
    const password = this.registerModel.password;
    const confirmPassword = this.registerModel.confirmPassword;
    return password === confirmPassword;
  }

  constructor(private authService: AuthService,
  ) {
  }

  register(): void {
    if (this.honeyBunny === '' && this.checkPasswords()) {
      this.checkboxTA.control.markAsDirty();
      if (!this.checkboxTA.control.value) {
        return;
      }

      this.registrationSuccessful = false;
      this.userIsAuthenticated = false;
      this.authService.register(this.registerModel.email, this.registerModel.password)
        .subscribe(rsp => {
          if (rsp.status === 201) {
            this.registrationSuccessful = true;
          }
        });
    }
  }
}
