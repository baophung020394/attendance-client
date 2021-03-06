import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClockInComponent } from './components/clock-in/clock-in.component';
import { ClockOutComponent } from './components/clock-out/clock-out.component';
import { AgmCoreModule } from '@agm/core'; 
import { AuthInterceptor } from './services/authconfig.interceptor';
import { ListAttandanceComponent } from './components/list-attandance/list-attandance.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ClockInComponent,
    ClockOutComponent,
    ListAttandanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5fd6inwcfBo9JIqs3X_FzHhk9s7NZVoQ'
    }) 
  ],
  providers: [
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: AuthInterceptor,
    //     multi: true
    // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
