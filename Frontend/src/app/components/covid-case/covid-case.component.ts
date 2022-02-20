import { AuthService } from '../../services/auth.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveCaseService } from 'src/app/services/save-case.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-covid-case',
  templateUrl: './covid-case.component.html',
  styleUrls: ['./covid-case.component.scss']
})
export class CovidCaseComponent implements OnInit {

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  save_covid : boolean = false;

  CovidForm: FormGroup;

  double_submit: number  =0;



  constructor(private validators: ValidatorsService,private save_case: SaveCaseService,private auth: AuthService) { }


  createFormGroup(): FormGroup{
    return new FormGroup({
        date_case: new FormControl("",[Validators.required,this.validators.isDate()
          ,this.validators.isFuture()])
     });
   }

  ngOnInit(): void {
    this.CovidForm = this.createFormGroup();
  }


  get_date_error()   {
    if (this.CovidForm.get("date_case")!.hasError('wrong_data')) {
      return 'You must not enter a future date';
    }

    else (this.CovidForm.get("date_case")!.hasError('wrong_date'))
    {
        return 'You must enter a date!'
    }




  }



  store_case(): void{
    this.save_case.send_backend_covid_case(this.auth.userId,this.CovidForm.value.date_case)
    .subscribe( (val)=>{

            console.log(val);

              if(val==2 || val===undefined){
                this.double_submit = 2;
                setTimeout( () => {
                  this.double_submit = 0;
                },5000);

                return this.double_submit;

              }

              else
              {
                this.double_submit = val;
                setTimeout( () => {
                  this.double_submit = 0;
                },5000);


                return this.double_submit;

              }



          });
    }

}
