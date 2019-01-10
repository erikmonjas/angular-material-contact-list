import { Directive } from "@angular/core";
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn, FormGroup } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const userPass = control.get('userPass');
    const userPassRepeat = control.get('userPassRepeat');
  
    return userPass && userPassRepeat && userPass === userPassRepeat ? { 'passwordsMatch': true } : null;
};

@Directive({
    selector: 'passwordsMatch',
    providers: [{ provide: NG_VALIDATORS, useExisting: passwordDirective, multi: true }]
})

export class passwordDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors {
        return passwordValidator(control)
    }
}