import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line: typedef
  loginSubmit() {
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value)
      .subscribe( (res) => {
        if (res) {
          console.log(res)
          localStorage.setItem('token', res.tokens);
          localStorage.setItem('user-id', res._id);
          this.router.navigate(['dashboard']);
        }
      });
  }
}
