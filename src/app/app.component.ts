import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PagePrincipalComponent } from "./page-principal/page-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PagePrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngluarProject';
}
