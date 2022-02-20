import { AuthService } from './../../services/auth.service';
import { UsersInfoService } from './../../services/users-info.service';
import { ChangeUsername } from './../../models/ChangeUsername';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/DialogData';
import { ValidatorsService } from 'src/app/services/validators.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.scss']
})
export class ForgotUsernameComponent implements OnInit {



   new_username_form : FormGroup;

   correct_password:number=0;
   click_confirm: number = 0;
   success: number = 0;

  constructor(public dialogRef: MatDialogRef<ForgotUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ChangeUsername,
    private validators:ValidatorsService,
    private  new_username_service: UsersInfoService,
    private auth : AuthService ) { }

    onCancel(): void {
      this.dialogRef.close();
    }

    createFormGroup(): FormGroup{
      return new FormGroup({
        new_name: new FormControl("",[Validators.required,Validators.minLength(2),this.validators.NameValidator()]),
        password: new FormControl("",[Validators.required,Validators.minLength(8),this.validators.PasswordValidator()]),
       });
     }

  ngOnInit(): void {
    this.new_username_form = this.createFormGroup();
  }

  check_password()
  {



    this.new_username_service.checkPassword
    (this.auth.userEmail,
    this.new_username_form.value.password)
      .pipe(map( (val)=>{

          this.click_confirm = 1;

            console.log(this.click_confirm,val);

             if(val==1){
              return this.correct_password=0;
              }

              else if(val===undefined && this.correct_password==0)
              {
                 setTimeout ( ()=>{
                   return this.click_confirm = 0;
                 },1000);

                 return this.correct_password =0;

              }

              else if(val===undefined && this.correct_password==1)
              {
                 setTimeout ( ()=>{
                   return this.success = 1;
                 },1000);

                 return this.correct_password = 1;

              }

                return this.correct_password = 1;


            }

          )).subscribe();

  }


  confirm() {

    this.dialogRef.close({ data: this.new_username_form.value.new_name })
  }






  get_name_errorMessage()
  {
    if (this.new_username_form.get("new_name")!.hasError('required'))
    return 'You should enter a name';


      else if(this.new_username_form.get("new_name")!.hasError('minlength'))
      return 'You should enter a name with 2 characters minimum';

      else
      return this.new_username_form.get("new_name")!.hasError('appropriate_name') ? 'Name must not be an email' : '' ;
  }


  get_password_errorMessage(){
    if (this.new_username_form.get("password")!.hasError('required'))
      return 'You must enter a password';


    else if(this.new_username_form.get("password")!.hasError('minlength'))
        return 'Password should contain 8 characters minimum';

    else
        return this.new_username_form.get("password")!.hasError('passwordStrength') ? 'Passwords should contain one capital one lower one number and one special character minimum 8 characters' : '' ;
  }



}
