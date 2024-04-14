import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-copyright',
    templateUrl: './copyright.component.html',
    styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent {
    currentDate: Date = new Date(); // Default value is the current date
    @Input() text: string = '';
}
