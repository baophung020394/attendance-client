import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClockInComponent } from './components/clock-in/clock-in.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ListAttandanceComponent } from './components/list-attandance/list-attandance.component';
import { ClockOutComponent } from './components/clock-out/clock-out.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clock-in', component: ClockInComponent },
  { path: 'clock-out', component: ClockOutComponent },
  { path: 'list', component: ListAttandanceComponent },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
