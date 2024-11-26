import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tab :String[]=['salma','Test']
  title = 'angularapp';

  table :number []=[1,2,3,5,4,6,8,10,18,20,16,14]
getColor(){
  return "red";
}
getBackgroundColor(){
  return "red";
}
estpair(elt :number){
  return elt % 2 === 0;
}
}
