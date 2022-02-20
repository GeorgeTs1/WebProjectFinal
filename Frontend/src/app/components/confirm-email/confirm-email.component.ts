import { AfterViewInit, Component, EventEmitter, Inject, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { ConfirmEmail } from 'src/app/models/ConfirmEmail';
import { AuthService } from 'src/app/services/auth.service';
import { UsersInfoService } from 'src/app/services/users-info.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { EmailSuccessComponent } from '../email-success/email-success.component';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit,OnChanges{


  emailForm: FormGroup;

  confirm_error : number = 0;

  wait = 1;

  show_bar = 0;

  hide=1;

  logout = 0;







  constructor(public dialogRef: MatDialogRef<ConfirmEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ConfirmEmail,
    private validators:ValidatorsService,
    private  confirm_email_service: UsersInfoService,
    private auth : AuthService,
    private router: Router) { }


  createFormGroup(): FormGroup{
    return new FormGroup({
        email: new FormControl("",[Validators.required,Validators.email]),
     });
   }

   onCancel(): void {
    this.dialogRef.close();
  }


  bar()
  {
     this.show_bar = 1;

     setTimeout( () => {
      this.show_bar = 0;
      this.router.navigate(['login']);
    },2000);

  }


  emailConfirm() {

    this.dialogRef.close({ data: 1 });
  }



  ngOnInit(): void {
    this.emailForm = this.createFormGroup();

  }

  ngOnChanges(changes: SimpleChanges): number {

        if(changes['wait'])
        {
              return this.wait = 0;
        }


        return 0;
  }





  get_email_errorMessage()   {
    if (this.emailForm.get("email")!.hasError('required')) {
      return 'You must enter an email';
    }

    return this.emailForm.get("email")!.hasError('email') ? 'Not a valid email' : '';
  }


  send_email()
  {
    this.confirm_email_service.send_new_password_req(this.emailForm.value.email)
    .pipe(map( (val:any)=> {



           if(val==1){
              return this.confirm_error=1;
            }


            this.auth.isUserLoggedIn$.subscribe( (val:any)=>{

                  if(val==true) return this.logout = 1;

                  return this.logout;
            })

            if(this.logout==1)
            {
              localStorage.removeItem("token");
              this.auth.isUserLoggedIn$.next(false);
              setTimeout( () => {
                this.router.navigate(['/login']);
              },5000);
            }




          this.confirm_email_service.setEmail(this.emailForm.value.email)
         return this.wait = val.wait;


    })).subscribe( ()=> {

    });
    }


  email_ok(no_more:any)
  {
    console.log(no_more);
     this.wait= no_more;
     return this.wait;
  }

}
