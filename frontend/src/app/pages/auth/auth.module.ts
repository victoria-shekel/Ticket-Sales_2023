import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthComponent } from './auth.component'
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    AuthorizationComponent,
    AuthComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
  ],
})
export class AuthModule { }
