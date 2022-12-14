import { Component, Input, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements AfterViewInit {

  @Input() control: AbstractControl;
  @Input() customErrors: Record<string, string> = {};

  private errorMessages: Record<string, string> = {
    required: 'This field must not be empty',
    minlength: 'Sorry, this field is too short',
    maxlength: 'Sorry, this field is too long',
    pattern: 'Sorry, this is not valid',
  }

  constructor() { }

  ngAfterViewInit() {
    // If a custom error has been provided, override the default errors (or add additional errors)
    Object.keys(this.customErrors).forEach((errorType) => {
      this.errorMessages[errorType] = this.customErrors[errorType];
    });
  }

  get errorMessage() {
    for (const error in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(error) &&
        (this.control.touched ||
          (this.control.asyncValidator !== null && !this.control.pristine))
      ) {
        return this.errorMessages[error];
      }
    }
    return null;
  }

}
