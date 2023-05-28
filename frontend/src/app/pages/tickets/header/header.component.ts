import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { IUser } from '../../../models/IUser';
import { IMenuType } from '../../../models/IMenuType';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() menuType: IMenuType;

  items: MenuItem[];
  time: Date;
  user: IUser | null;
  timerInterval: number;
  settingsActive = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initMenuItems();

    this.timerInterval = window.setInterval(()=>{
      this.time = new Date();
    },1000)
  }
  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === 'extended';
    this.items = this.initMenuItems();
  }
  ngOnDestroy() {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  initMenuItems(): MenuItem[] {
    console.log('initMenuItems')
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Заказы',
        routerLink:['orders']
      },
      {
        label: 'Настройки',
        routerLink:['/tickets/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command:() => {
          this.authService.logout();
        }
      },
    ];
  }
}
