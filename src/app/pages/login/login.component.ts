import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IUser } from 'src/app/models/iuser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false })
  loginForm!: NgForm;
  user: IUser = { email: 'eduver_san@hotmail.com', password: '123456' }

  passwordVisible = false;
  constructor(
    private notification: NzNotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.loginForm.form.markAllAsTouched();
    if (this.loginForm.form.invalid) {
      this.createBasicNotification('Formulario Inválido')
      return;
    }
    console.log(this.loginForm.form.value);
    const { email, password } = this.loginForm.form.value
    this.authService.login(email, password)
      .then(resp => {
        // this.router.navigate(['/admin']);
        console.log(resp);
      })
      .catch(() => this.createBasicNotification('Datos incorrectos'));

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
