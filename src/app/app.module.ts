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
import { MotivationDialogComponent } from './motivation-dialog/motivation-dialog.component';
import { AboutComponent } from './about/about.component';
import { NgChartsModule } from 'ng2-charts';
import { LogComponent } from './log/log.component';
import { LearnlanguageComponent } from './learn-language/learn-language.component';
import { ContactComponent } from './contact/contact.component';
import { LanguageGameComponent } from './language-game/language-game.component';
import { CultureGeneraleComponent } from './culture-generale/culture-generale.component';
import { PagegameComponent } from './pagegame/pagegame.component'; 

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
    ContactComponent,
    LanguageGameComponent,
    CultureGeneraleComponent,
    PagegameComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule, // Import nécessaire
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
