import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modefier-passwd',
  templateUrl: './modefier-passwd.component.html',
  styleUrls: ['./modefier-passwd.component.css'],
})
export class ModefierPasswdComponent {
  // Formulaire pour changer le mot de passe
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModefierPasswdComponent>
  ) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  /**
   * Validateur personnalisé pour vérifier si les mots de passe correspondent
   */
  private passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Méthode appelée lors de la soumission du formulaire
   */
  onSubmit() {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      console.log('Password change data:', formData);
      // Traitez les données (ex. : appel à un service backend pour changer le mot de passe)
      this.dialogRef.close(formData); // Ferme le dialogue et retourne les données
    }
  }
}
