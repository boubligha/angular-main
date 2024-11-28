import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModefierPasswdComponent } from '../sous_composants/modefier-passwd/modefier-passwd.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // Correction : 'styleUrls' au lieu de 'styleUrl'
})
export class ProfileComponent {
  constructor(private dialog: MatDialog) {}

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(ModefierPasswdComponent, {
      width: '400px', // Optionnel : définir la largeur du dialogue
      data: { /* Vous pouvez passer des données ici si nécessaire */ }
    });

    // Récupérer les données lorsque le dialogue se ferme
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogue fermé, résultat:', result);
      if (result) {
        // Traitez le résultat ici
        console.log('Données reçues:', result);
      }
    });
  }

  openNotifications(): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '400px', // Optionnel : définir la largeur du dialogue
      data: { /* Vous pouvez passer des données ici si nécessaire */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogue fermé, résultat:', result);
      if (result) {
        // Traitez le résultat ici
        console.log('Données reçues:', result);
      }
    });
  }
}
