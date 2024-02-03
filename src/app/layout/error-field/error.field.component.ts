import { Component, Input } from '@angular/core';


@Component({
  selector: 'error-message-app',
  templateUrl: './error.field.component.html',
  styleUrls: []
})

export class ErrorFieldComponent {
  @Input() message: string = '';
  @Input() messages: string[] = [];
  @Input() displayError: boolean = false;
}
