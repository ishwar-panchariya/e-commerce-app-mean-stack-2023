import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  errorMsg: string;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private localStorageService: LocalstorageService,
    private router: Router) {}

  ngOnInit(): void {
      this._initForm()
  }

  private _initForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit(){
    this.isSubmitted = true

    if(this.loginForm.invalid) return;

    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(user => {
      this.authError = false;
      this.localStorageService.setToken(user.token)
      this.router.navigate(['/']);
    },
    (error) => {
      this.authError = true;
      this.errorMsg = error.error
      if(error.status !== 400) {
        this.errorMsg = "Error in the server. Please try again later.";
      }
    })
  }
}
