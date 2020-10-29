import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security/security.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [SecurityComponent, SignupComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SecurityModule { }
