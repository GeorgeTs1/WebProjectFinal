import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePassword, MyErrorStateMatcher } from 'src/app/models/ChangePassword';
import { AuthService } from 'src/app/services/auth.service';
import { UsersInfoService } from 'src/app/services/users-info.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    new_password_form : FormGroup;

   correct_password:number=0;
   click_confirm: number = 0;
   success: number = 0;

    matcher = new MyErrorStateMatcher();

    password_change : number = 0;


  constructor(
    private validators:ValidatorsService,
    private  new_password_service: UsersInfoService,
    private auth : AuthService,
    private router: Router ) { }




    createFormGroup(): FormGroup {
      return new FormGroup({
        new_password: new FormControl("",[Validators.required,Validators.minLength(8),this.validators.PasswordValidator()]),
        confirm_password: new FormControl("",[Validators.required,Validators.minLength(8)]),
      }, {
              validators: this.validators.checkPasswords
         })
     }





  ngOnInit(): void {
    this.new_password_form = this.createFormGroup();


  }






  ok()
  {
    this.new_password_service.save_password
    (this.new_password_service.email,
      this.new_password_form.value.new_password)
    .subscribe( (val:any)=> {

         this.password_change = val.ok;

         setTimeout( () => {
          this.router.navigate(['login']);
        },3000);


    })
  }


  back2home()
  {
    this.router.navigate(['home']);
  }





  get_password_errorMessage(){
    if (this.new_password_form.get("new_password")!.hasError('required'))
      return 'You must enter a password';


    else if(this.new_password_form.get("new_password")!.hasError('minlength'))
        return 'Password should contain 8 characters minimum';

    else
        return this.new_password_form.get("new_password")!.hasError('passwordStrength') ? 'Passwords should contain one capital one lower one number and one special character minimum 8 characters' : '' ;
  }



  get_confirm_password_errorMessage(){
    if (this.new_password_form.get("confirm_password")!.hasError('required'))
      return 'You must enter a password';


    else if(this.new_password_form.get("confirm_password")!.hasError('minlength'))
        return 'Password should contain 8 characters minimum';

    else if(this.new_password_form.get("confirm_password")!.hasError('passwordStrength'))
        return 'Passwords should contain one capital one lower one number and one special character minimum 8 characters';


    else
    {
          return 'Passwords not match';
    }
  }



}
