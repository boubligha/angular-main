import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SecretComponent } from './secret/secret.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { LogComponent } from './log/log.component';
import { LearnlanguageComponent } from './learn-language/learn-language.component';
import { MotivationDialogComponent } from './motivation-dialog/motivation-dialog.component';
import { ContactComponent } from './contact/contact.component';
import { LanguageGameComponent } from './language-game/language-game.component';
import { CultureGeneraleComponent } from './culture-generale/culture-generale.component';
import { PagegameComponent } from './pagegame/pagegame.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'secret', component: SecretComponent },
  {path:'profile', component:ProfileComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Route par défaut
  {path:'about', component:AboutComponent},//contact
  {path:'log', component:LogComponent},
  {path:'learnLanguage', component:LearnlanguageComponent},
  {path:'motivation', component:MotivationDialogComponent},
  { path: 'contact', component: ContactComponent },
  {path:'LanguageGameComponent', component:LanguageGameComponent},
  { path: 'culture-generale', component: CultureGeneraleComponent },//
  { path: 'app-pagegame', component: PagegameComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }