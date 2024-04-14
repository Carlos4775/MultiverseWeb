import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent {
    @Input() titlePrefix: string = 'Explore the Universe';
    @Input() title: string = 'A Journey Through Cosmic Wonders';
    @Input() description: string = 'Unleash your curiosity and explore the wonders of the universe through captivating visuals and cosmic marvels in our carousel.';
}
