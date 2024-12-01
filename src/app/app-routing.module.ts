import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SecretComponent } from './secret/secret.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { LogComponent } from './log/log.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'secret', component: SecretComponent },
  {path:'profile', component:ProfileComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Route par défaut
  {path:'about', component:AboutComponent},//contact
  {path:'log', component:LogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

