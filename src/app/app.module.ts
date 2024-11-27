import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // For routing

// Angular Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Import your components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SecretComponent } from './secret/secret.component';
import { ModalComponent } from './modal/modal.component';
import { ProfileComponent } from './profile/profile.component';
import { ModefierPasswdComponent } from './sous_composants/modefier-passwd/modefier-passwd.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecretComponent,
    ModalComponent,
    ProfileComponent,
    ModefierPasswdComponent, // Declare your password modification component here
  ],
  imports: [
    BrowserModule,
    CommonModule, // Necessary for ngIf and ngFor
    AppRoutingModule, // Your routing module
    RouterModule, // Enable routing in your application
    FormsModule, // For template-driven forms
    ReactiveFormsModule, // For reactive forms
    BrowserAnimationsModule, // Required for Angular Material
    MatDialogModule, // Dialog functionality
    MatFormFieldModule, // Material form fields
    MatInputModule, // Material inputs
    MatButtonModule, // Material buttons
    MatIconModule, // Material icons
    RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
