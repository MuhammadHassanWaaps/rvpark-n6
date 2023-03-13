import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorsService {

  constructor() { }



  findInvalidControls(f: FormGroup) {
    const invalid: any[] = [];
    const controls = f.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push({
          con: name,
          error: controls[name].errors
        });
      }
    }
    return invalid;
  }

  getFirstFormError(form: FormGroup){

    var errorMessage = "Error";
    const res = this.findInvalidControls(form);
    console.log(res);

    let first = res[0];

    let label = first['con'].replace('_', ' ');

    if(first.error?.['required']){
      errorMessage = label + " is required";
    }

    if(first.error?.['minlength']){
      errorMessage = label + " at least " + first.error?.['minlength'].requiredLength + " characters";
    }

    if(first.error?.['min']){
      errorMessage = label + " at least " + first.error?.['min'].min + " ";
    }

    if(first.error?.['maxlength']){
      errorMessage = label + " at most " + first.error?.['maxlength'].requiredLength + " characters";
    }

    if(first.error?.['pattern']){
      errorMessage = label + " should be like " + first.error?.['pattern'].requiredPattern + " pattern";
    }

    if(first.error?.['email']){
      errorMessage = label + "  format error ";
    }

    return errorMessage;

  }


}
