import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// Angular Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Import MatSlideToggleModule

// Import your components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SecretComponent } from './secret/secret.component';
import { ModalComponent } from './modal/modal.component';
import { ProfileComponent } from './profile/profile.component';
import { ModefierPasswdComponent } from './sous_composants/modefier-passwd/modefier-passwd.component';
import { NotificationComponent } from './notification/notification.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MotivationDialogComponent } from './motivation-dialog/motivation-dialog.component';
import { AboutComponent } from './about/about.component';
import { NgChartsModule } from 'ng2-charts';
import { LogComponent } from './log/log.component';
import { LearnlanguageComponent } from './learn-language/learn-language.component'; 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecretComponent,
    ModalComponent,
    ProfileComponent,
    ModefierPasswdComponent,
    NotificationComponent,
    MotivationDialogComponent,
    AboutComponent,
    LogComponent,
    LearnlanguageComponent,
  ],
  imports: [
    FormsModule, // Import nécessaire
    CommonModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    RegisterComponent,
    NgChartsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
