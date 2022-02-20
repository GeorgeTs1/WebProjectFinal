import { SearchbarService } from 'src/app/services/searchbar.service';
import { ValidatorsService } from './../../services/validators.service';
import { catchError } from 'rxjs/operators';
import { map, Observable, of,iif, throwError } from 'rxjs';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { User } from 'src/app/models/User';
import { AllShops } from 'src/app/models/AllPOIS';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  log_error:number = 0;

  user_id :Pick<User,"id">;

  hide = true;

  static shops_name : AllShops[];


  user_email: Pick<User,"email">

  constructor(private authService:AuthService,
    private loginError : ErrorHandlerService,
    private validators: ValidatorsService,
    private getAllPoiService: SearchbarService) {}

  createFormGroup(): FormGroup{
    return new FormGroup({
        email: new FormControl("",[Validators.required,Validators.email]),
        password: new FormControl("",[Validators.required,Validators.minLength(8),this.validators.PasswordValidator()]),
     });
   }


  ngOnInit(): void {
    this.loginForm = this.createFormGroup();

  }


  get_email_errorMessage()   {
    if (this.loginForm.get("email")!.hasError('required')) {
      return 'You must enter an email';
    }

    return this.loginForm.get("email")!.hasError('email') ? 'Not a valid email' : '';
  }

  get_password_errorMessage(){
    if (this.loginForm.get("password")!.hasError('required'))
      return 'You must enter a password';


    else if(this.loginForm.get("password")!.hasError('minlength'))
        return 'Password should contain 8 characters minimum';

    return this.loginForm.get("password")!
    .hasError('passwordStrength') ? 'Passwords should contain one capital one lower one number and one special character minimum 8 characters' : '' ;
  }

  login(): void{
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
      .pipe(map( (val:any)=>{

                if(val.admin==undefined)
                {
                    console.log(val)
                }

                else if(val.admin==1)
                {
                      console.log("admin mode");
                }

                else
                {
                  console.log("user mode");
                }

                if(val==1){

                      this.log_error = 1;
                      setTimeout( () => {
                        this.log_error=0;
                      },3500);
                        return this.log_error;
                  }

                  this.user_id = this.authService.userId;
                  return this.user_id;
          }
            )).subscribe();


            this.getAllPoiService.getAllPois()
            .pipe(
                map( (shops) =>{



                     // `reduce` over the data to produce an object
                    // with letter keys, and array values where the names are added
                    const obj = shops[0].reduce( (acc:any, shop:any) => {
                      const letter = shop.name[0];
                      acc[letter] = (acc[letter] || []).concat(shop.name);
                      return acc;
                    }, {})


                    // `map` over the object entries to return an array of objects
                    shops[0] = Object.entries(obj).map(([letter, names]) => {
                      return { letter, names }
                    }).sort( (a:any, b:any):any  => {


                      if( /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~«»¨]/.test(a.letter) || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~«»¨]/.test(b.letter) )
                      {

                        return -1;

                      }


                      if(a.letter !== b.letter)
                      {

                        return a.letter > b.letter ? 1 : -1;
                      }




                    });

                   console.log(LoginComponent.shops_name = shops[0]);



                  })
                ).subscribe();


      }
}


