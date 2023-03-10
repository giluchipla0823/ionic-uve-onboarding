import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormEventItemService } from './form-event-item/form-event-item.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  form: FormGroup;
  customErrorMessages: Record<string, string> = {
    required: 'You... kind of need a username',
  };

  constructor(
    private fb: FormBuilder,
    private formEventItemService: FormEventItemService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.form.get('username').valueChanges.subscribe((value) => {
      console.log('username', value);
    });

    this.formEventItemService.downloadItem$.subscribe((res) => {
      console.log('QUE PASA AQUI', res);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('FORM VALID', this.form.value);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
}
