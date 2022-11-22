import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-main-sedena',
  templateUrl: './main-sedena.component.html',
  styleUrls: ['./main-sedena.component.css']
})
export class MainSedenaComponent implements OnInit {

  pageActual:number = 1;
  inputBuscar:boolean = false;

  personalList: any[] = [];

  key:string = 'name';
  reverse:boolean = false;
  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private formBuilder:FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    //console.log("EFEEEES")
    this.userService.getAllUsers().then(fListDep=>{
      this.personalList = [fListDep]
    }).catch(err =>{
      console.log("error al cargar los vuelos" + err);
    });
    
  }

}
