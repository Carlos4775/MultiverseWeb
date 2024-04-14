import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ImageGalleryVM } from 'src/app/interfaces/gallery.interface';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

    imagesGallery: ImageGalleryVM[] = [];
    responsiveOptions;

    private unsubscribe$ = new Subject<void>();

    constructor(
        public galleryService: GalleryService,
        public router: Router
    ) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
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
