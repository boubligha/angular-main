import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'] 
})
export class ModalComponent implements OnInit {
  @Input() isOpen: boolean = false; // Indique si le modal est ouvert
  @Input() questions: any[] = []; // Tableau des questions

  constructor() { }

  ngOnInit() { }

 closeModal() {
  this.isOpen = false;
}
  submitQuiz(){
  }
}