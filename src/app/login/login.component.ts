import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  registeredUser!: string

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private auth: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onRegister(): Promise<void> {
    console.log('onRegister');
    let userRes
    try {
      userRes = await firstValueFrom(this.http.get
      (`https://railway-planner-backend-production.up.railway.app/user?username=${this.loginForm.value.username}`))
      console.log('userREs', userRes, typeof userRes);
      if (userRes) {
        console.log('User already existing!')
      }
    } catch (e) {
      console.log('Error getting user', e)
    }

    // this.http.post
    // ('https://railway-planner-backend-production.up.railway.app/register',{
    //   username: this.loginForm.value.username,
    //   password: this.loginForm.value.password
    // }).subscribe((data) => {
    //   this.registeredUser = this.loginForm.value.username || ''
    //   console.log('subscribe data', data)
    //   this.auth.setLoggedIn(this.loginForm.value.username || '')
    //   this.router.navigate(['/board'])
    // })
  }

  async onSubmit() {
    console.log('onSubmit');
    this.http.post
    ('https://railway-planner-backend-production.up.railway.app/login',{
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe((data) => {
      console.log('subscribe data', data)
      this.auth.setLoggedIn(this.loginForm.value.username || '')
      this.router.navigate(['/board'])
    })
  }

}
