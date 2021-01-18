import { FormGroup, AbstractControl, ValidationErrors } from "@angular/forms";
export function validFirstChar(control: AbstractControl) {
    
    if (!control.value.match(/^[A-Za-z]*$/)) {
      return { validFchar: true };
    }
    return null;
  }

export function validLastChar(control: AbstractControl) {
    
    if (!control.value.match(/^[A-Za-z]*$/)) {
      return { validLchar: true };
    }
    return null;
  }
