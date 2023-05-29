import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  isTouched: boolean = false;
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  /**
   * Изменить пароль
   */
  changePassword() {
    this.isTouched = true;
    if (this.repeatPassword != this.newPassword) return;
    const result = this.authService.changePassword(this.currentPassword, this.newPassword);
    if (result) {
      this.messageService.add({
        severity: 'success',
        summary: `Пароль успешно изменен`,
      });
      this.isTouched = false;
      this.currentPassword = '';
      this.newPassword = '';
      this.repeatPassword = '';
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Неверные данные. Повторите попытку',
      });
    }
  }
}
