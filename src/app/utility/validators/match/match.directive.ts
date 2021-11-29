import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { match } from './match.validator';

@Directive({
  selector: '[match]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchDirective, multi: true }]
})
export class MatchDirective implements Validator {

  @Input('match')
  matchTo: string = ''
  
  validate(control: AbstractControl): ValidationErrors | null {
    console.log('shouldMatch:', this.matchTo);
    
    return match(this.matchTo)(control)
  }
}