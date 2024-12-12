import { Component, ElementRef, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-motivation-dialog',
  templateUrl: './motivation-dialog.component.html',
  styleUrls: ['./motivation-dialog.component.css']
})
export class MotivationDialogComponent implements OnInit {
  @ViewChild('motivationCard', { static: false }) motivationCard!: ElementRef;
  score: number = 0; // Declare a variable to store the score

  constructor(
    public dialogRef: MatDialogRef<MotivationDialogComponent>, // MatDialogRef injection
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to access passed data
  ) {}

  ngOnInit(): void {
    // Access the score from the dialog's data
    if (this.data && this.data.score !== undefined) {
      this.score = this.data.score;
    }
  }

  closeDialog() {
    this.dialogRef.close(); // Ensure that this closes the dialog properly
  }

  async downloadCard() {
    if (!this.motivationCard) return;

    const cardElement = this.motivationCard.nativeElement;

    // Capture the HTML element as an image
    const canvas = await html2canvas(cardElement);
    const image = canvas.toDataURL('image/png');

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'motivation-card.png';
    link.click();
  }
}
