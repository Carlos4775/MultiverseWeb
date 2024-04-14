import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    isAtTop: boolean = true;
    isScrollingDown: boolean = false;
    isPastHalfScreen: boolean = false;
    lastScrollPosition: number = 0;

    constructor(
        public router: Router
    ) {

    }

    @HostListener('window:scroll')
    onWindowScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isScrollingDown = scrollPosition > this.lastScrollPosition;
        this.isAtTop = scrollPosition === 0;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        const scrollMiddle = scrollPosition + windowHeight / 2;
        this.isPastHalfScreen = scrollMiddle >= documentHeight / 5;
        this.lastScrollPosition = scrollPosition;
    }
}
