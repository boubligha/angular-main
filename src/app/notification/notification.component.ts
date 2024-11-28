import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],

})
export class NotificationComponent {
  // Simple NgModel-based slide toggle
  isChecked = false;

  // Reactive form setup
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the reactive form with form controls and validators
    this.formGroup = this.fb.group({
      enableWifi: [false],
      acceptTerms: [false, Validators.requiredTrue]  // Requires terms to be accepted
    });
  }

  // Method to handle form submission (for both template-driven and reactive forms)
  alertFormValues(form: any) {
    console.log('Form Values:', form);
  }

  // For reactive form submission
  onSubmit() {
    console.log('Reactive Form Values:', this.formGroup.value);
  }
}



