import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  status: { isError: boolean, message: string } = {
    message: '',
    isError: false
  }
  registerForm = this.formBuilder.group({
    name: '',
    username: '',
    password: ''
  });
  registeredUser!: string


  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router
  ) {}

  ngOnInit(): void {}

  async onRegister(): Promise<void> {
    console.log('onRegister');
    this.http.post
    ('https://railway-planner-backend-production.up.railway.app/register',{
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    }).subscribe({
      next: (data: any) => {
        // this.registeredUser = this.registerForm.value.username || ''
        this.registeredUser = data.username || ''
        this.status.isError = false
        window.alert(`Register user ${this.registeredUser}. Please login in!`)
        this.router.navigate(['/login'])

      },
      error: (error) => {
        const e = error as HttpErrorResponse
        console.log('errorstatus', e.status)
        if (e.status && e.status === 409) {
          this.status.isError = true
          this.status.message = 'Username already existing! Please choose a different username'
        }
        else {
          this.status.isError = true
          this.status.message = `Unbekannter Fehler beim Login: ${e.message}`
        }
      }
    })
  }

}
