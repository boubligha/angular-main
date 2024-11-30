import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-motivation-dialog',
  templateUrl: './motivation-dialog.component.html',
  styleUrls: ['./motivation-dialog.component.css']
})
export class MotivationDialogComponent {
  @ViewChild('motivationCard', { static: false }) motivationCard!: ElementRef;

  constructor(public dialogRef: MatDialogRef<MotivationDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  async downloadCard() {
    if (!this.motivationCard) return;

    const cardElement = this.motivationCard.nativeElement;

    // Capture l'élément HTML sous forme d'image
    const canvas = await html2canvas(cardElement);
    const image = canvas.toDataURL('image/png');

    // Crée un lien pour télécharger l'image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'motivation-card.png';
    link.click();
  }
}
