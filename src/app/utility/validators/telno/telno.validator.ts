import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** Input arguments are directive parameters */
export function telno(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const res = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/.test(control.value);
    
    // null if valid
    return !res ? {telno: {value: control.value}} : null;
  };
}