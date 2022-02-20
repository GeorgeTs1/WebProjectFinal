import { ValidatorsService } from './../../services/validators.service';
import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;

  signup_err_arr:any = [];
  signup_err:boolean;



  constructor(private authService:AuthService,private validators:ValidatorsService,private router: Router) { }

  ngOnInit(): void {

    this.signupForm = this.createFormGroup();

  }


  createFormGroup(): FormGroup{
    return new FormGroup({
        username: new FormControl("",[Validators.required,Validators.minLength(2),this.validators.NameValidator()]),
        email: new FormControl("",[Validators.required,Validators.email]),
        password: new FormControl("",[Validators.required,Validators.minLength(8),this.validators.PasswordValidator()]),
    })
  }

  get_name_errorMessage()
  {
    if (this.signupForm.get("username")!.hasError('required'))
    return 'You should enter a name';


      else if(this.signupForm.get("username")!.hasError('minlength'))
      return 'You should enter a name with 2 characters minimum';

      else
      return this.signupForm.get("username")!.hasError('appropriate_name') ? 'Name must not be an email' : '' ;
  }

  get_email_errorMessage()   {
    if (this.signupForm.get("email")!.hasError('required')) {
      return 'You must enter an email';
    }

    return this.signupForm.get("email")!.hasError('email') ? 'Not a valid email' : '';
  }

  get_password_errorMessage(){
    if (this.signupForm.get("password")!.hasError('required'))
      return 'You must enter a password';


    else if(this.signupForm.get("password")!.hasError('minlength'))
        return 'Password should contain 8 characters minimum';

    else
        return this.signupForm.get("password")!.hasError('passwordStrength') ? 'Passwords should contain one capital one lower one number and one special character minimum 8 characters' : '' ;
  }



  signup(): void{
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value)
      .subscribe((msg) => {
            console.log(msg);
            this.signup_err_arr.push(msg);
            if(this.signup_err_arr[0].message !== 'User registered!')
                this.signup_err = true;
            else{
                this.signup_err = false;
                setTimeout( () => {
                  this.router.navigate(['login']);
                },5000);
            }
      });
  }

}
