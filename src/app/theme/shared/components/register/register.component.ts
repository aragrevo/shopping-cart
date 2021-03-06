import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { IUser } from 'src/app/models/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './../../../../pages/login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm', { static: false })
  registerForm!: NgForm;
  user: IUser = { email: '', password: '' }

  passwordVisible = false;
  password2Visible = false;
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
    this.registerForm.form.markAllAsTouched();
    if (this.registerForm.form.invalid) {
      this.createBasicNotification('Formulario Inválido')
      return;
    }
    const { email, password } = this.registerForm.form.value;
    this.authService.createUser(email, password)
      .then(() => this.authService.login(email, password))
      .then(() => {
        this.message.create('success', `Bienvenido!, ${email}`);
        this.modalService.closeAll();
      })
      .catch(() =>
        this.createBasicNotification('La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'));
  }

  handleLogin() {
    this.modalService.closeAll();
    this.modalService.create({
      ...this.customSettingsModal,
      nzContent: LoginComponent,
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
