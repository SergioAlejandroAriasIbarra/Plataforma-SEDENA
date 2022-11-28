import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-checkin-list',
  templateUrl: './checkin-list.component.html',
  styleUrls: ['./checkin-list.component.css']
})
export class CheckinListComponent {
  selectedValue: string ='';
  selectedCar: string = '';
  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];


  prueba(selectedCar:string){
    console.log(selectedCar)
  }
}
