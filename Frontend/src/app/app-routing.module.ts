import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EmailSuccessComponent } from './components/email-success/email-success.component';
import { CovidCaseComponent } from './components/covid-case/covid-case.component';

import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { MapComponent } from './components/map/map.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "map", component: MapComponent,canActivate: [AuthGuard]},
  { path: "CovidForm",component: CovidCaseComponent,canActivate: [AuthGuard]},
  { path: "email_success",component:EmailSuccessComponent},
  { path: "new_password",component:ForgotPasswordComponent},
  { path: "admin",component:AdminPageComponent},
  { path: "**", redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
