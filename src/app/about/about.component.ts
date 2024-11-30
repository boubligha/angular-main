import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  // Données du graphique (par exemple pour un graphique doughnut)
  doughnutChartData: number[] = [30, 25, 20, 15, 10];
  doughnutChartLabels: string[] = ['General Knowledge', 'Books', 'Music', 'Science', 'Movies'];
  
  // Options du graphique
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };

  chartLegend = true;  // Afficher la légende
  chartType: string = 'doughnut';  // Type de graphique, ici doughnut

  constructor() { }

  ngOnInit(): void {
    // Vous pouvez ajouter des actions ici pour initialiser des données
  }
}
