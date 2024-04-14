import { LayoutService } from './../../layout/service/app.layout.service';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { StorageService } from '../auth/services/storage.service';
import { ToastService } from '../auth/services/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent implements OnDestroy {

    signupForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    });

    private registrationSub: Subscription | undefined;

    constructor(
        public router: Router,
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private auth: AuthenticationService,
        private ss: StorageService,
        private toast: ToastService
    ) { }

    ngOnDestroy(): void {
        if (this.registrationSub) {
            this.registrationSub.unsubscribe();
        }
    }

    get password() { return this.signupForm.get('password'); }

    signup() {
        const user = this.signupForm.value;

        this.registrationSub = this.auth.register(
            user.username!,
            user.email!,
            user.password!
        ).subscribe(
            resp => {
                this.signupForm.reset();

                this.auth.persistUser(resp);

                this.toast.showSuccess('Successfully created account. Redirecting you to the quizzes.');

                const attemptedRoute = this.ss.getItem('attemptedRoute');
                this.ss.removeItem('attemptedRoute');
                this.router.navigateByUrl(attemptedRoute || '/')
            },
            () => {
                this.toast.showDanger('There was a problem registering your account.');
            }
        );
    }
}
