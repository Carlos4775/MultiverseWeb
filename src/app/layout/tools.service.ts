import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class ToolsServices {

    private messages: { [key: string]: { [key: string]: string } };

    constructor(private http: HttpClient) {
        this.messages = {
        };
    }

    validateInputs(prefix: string, container: AbstractControl, controlName: string | null = null): { [key: string]: { [key: string]: string } } {
        let message = {} as { [key: string]: { [key: string]: string } };

        if (container instanceof FormGroup) {
            const group = (container as FormGroup);

            for (const field in group.controls) {
                const control = group.controls[field];

                let childMessages = this.validateInputs(prefix, control, field);
                Object.assign(message, childMessages);
            }
        }
        else if (container instanceof FormArray) {
            const group = (container as FormArray);

            for (const field in group.controls) {
                const control = group.controls[field];

                let childMessages = this.validateInputs(prefix, control, field);
                Object.assign(message, childMessages);
            }
        }

        if (this.messages[prefix + controlName]) {
            message[prefix + controlName] = {};
            const control = (container as FormControl);

            if ((control.dirty || control.touched) && control.errors) {
                Object.keys(control.errors).forEach(messageKey => {
                    if (this.messages[prefix + controlName][messageKey]) {
                        message[prefix + controlName] = this.messages[prefix + controlName][messageKey] as {};
                    }
                });
            }
        }

        return message;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);

            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
                control.markAsDirty({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            } else {
                if (control instanceof FormArray) {
                    control.controls.forEach((A: any) => {
                        this.validateAllFormFields(<FormGroup>A);
                    });
                }
            }
        });
    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field)?.valid && form.get(field)?.touched && form.get(field)?.dirty;
    }
}