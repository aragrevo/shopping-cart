import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { IUser } from 'src/app/models/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from 'src/app/theme/shared/components/register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false })
  loginForm!: NgForm;
  user: IUser = { email: '', password: '' }

  passwordVisible = false;
  customSettingsModal = {
    nzFooter: null,
    nzStyle: { top: '1vh' },
    nzBodyStyle: { backgroundColor: '#f0f2f5', maxHeight: '94vh' },
  }

  constructor(
    private notification: NzNotificationService,
    private authService: AuthService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.loginForm.form.markAllAsTouched();
    if (this.loginForm.form.invalid) {
      this.createBasicNotification('Formulario Inválido')
      return;
    }
    const { email, password } = this.loginForm.form.value
    this.authService.login(email, password)
      .then(() => {
        this.message.create('success', `Bienvenido!, ${email}`);
        this.modalService.closeAll();
      })
      .catch(() => this.createBasicNotification('Correo ó contraseña incorrectos'));
  }

  handleRegister() {
    this.modalService.create({
      ...this.customSettingsModal,
      nzContent: RegisterComponent,
    });
  }

  createBasicNotification(message: string): void {
    this.notification
      .create(
        'warning',
        'Información',
        message
      )
  }

}
