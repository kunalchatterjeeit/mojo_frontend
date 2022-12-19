import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlainLayoutRoutes } from './plain-layout.routing';
import { RegistrationComponent } from '../../registration/registration.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from 'app/login/login.component';
import { LandingComponent } from 'app/landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PlainLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    LandingComponent
  ]
})

export class PlainLayoutModule { }
