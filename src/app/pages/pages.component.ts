import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GalleryService } from '../service/gallery.service';
import { ImageGalleryVM } from '../interfaces/gallery.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    isAtTop: boolean = true;
    isScrollingDown: boolean = false;
    isPastHalfScreen: boolean = false;
    lastScrollPosition: number = 0;
    imagesGallery: ImageGalleryVM[] = [];

    private unsubscribe$ = new Subject<void>();

    constructor(
        public layoutService: LayoutService,
        public galleryService: GalleryService,
        public router: Router
    ) { }

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

    ngOnInit(): void {
        this.getImagesGallery()
    }

    private getImagesGallery(): void {
        this.galleryService.getList()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(res => {
                const response = res.body;
                this.imagesGallery = response.data;
            })
    }
}
