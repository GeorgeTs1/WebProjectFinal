import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export interface ChangePassword {
  email: string
  NewPassword: string;
  Confirm_Pass: string;
}




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
     const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
     const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

     return invalidCtrl || invalidParent;
  }
}
