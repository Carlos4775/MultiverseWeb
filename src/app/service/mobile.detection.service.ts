import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MobileDetectionService {
    public isMobile(): boolean {
        return window.innerWidth <= 768;
    }
}
