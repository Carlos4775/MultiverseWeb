import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { ToastService } from '../auth/services/toast.service';
import { StorageService } from '../auth/services/storage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnDestroy {

    valCheck: string[] = ['remember'];

    password!: string;

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    private loginSub: Subscription | undefined;

    constructor(
        public router: Router,
        public layoutService: LayoutService,
        private toast: ToastService,
        private fb: FormBuilder,
        private auth: AuthenticationService,
        private ss: StorageService
    ) { }

    ngOnDestroy(): void {
        if (this.loginSub) {
            this.loginSub.unsubscribe();
        }
    }

    login() {
        const credentials = this.loginForm.value;

        this.loginSub = this.auth.login(
            credentials.email!,
            credentials.password!
        ).subscribe(
            resp => {
                this.loginForm.reset();

                this.auth.persistUser(resp);

                this.toast.showSuccess('Successfully logged in.');

                const attemptedRoute = this.ss.getItem('attemptedRoute');
                this.ss.removeItem('attemptedRoute');
                this.router.navigateByUrl(attemptedRoute || '/')
            },
            () => {
                this.toast.showDanger('Login unsuccessful. Check your credentials.');
            }
        );
    }
}
