import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatStartDate } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {


  NameValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }
        const notEmail = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig.test(value);

        const nice_name = notEmail;

        return !nice_name ? {appropriate_name :true}: null;
     }
    }

    PasswordValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecial = /[~!@#$%^&*]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

        return !passwordValid ? {passwordStrength:true}: null;
      }
    }


save_visit_validator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }



      const hasNumeric = /[0-9]+/.test(value);


      const save_visit_valid = hasNumeric;

      return !save_visit_valid ? {save_visit:true}: null;
  }
}


isDate(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;


      if(!value)
      {
        return null;
      }

       const res =  moment(value, 'DD/MM/YYYY',true).isValid();


      return !res ? null: {wrong_date:true};
  }
}



isFuture(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value : Date = control.value;

      if(!value)
      {
        return null;
      }

      let currDate = new Date();

      const diffTime = currDate.valueOf()-value.valueOf();

      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


      if(days < 0 || days == -0) return {wrong_data:true}
      else return null;

  }
}


withinGoodRange() : ValidatorFn {
return (control: AbstractControl): ValidationErrors | null => {

    let startDate = control.get('start')!.value;

    let endDate = control.get('end')!.value;

    if(!endDate || !startDate)
    {
      return null;
    }

    const diffTime = endDate-startDate;

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    if( days !==7  &&  days !==0 )
    {
       return  {error_range: true};
    }
    else
    {
      return null;
    }

  }

}



checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  let pass = group.get('new_password')!.value;
  let confirmPass = group.get('confirm_password')!.value;
  return pass === confirmPass ?  null : {notSame:true};
  }
}













