import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-main-sedena',
  templateUrl: './main-sedena.component.html',
  styleUrls: ['./main-sedena.component.css']
})
export class MainSedenaComponent implements OnInit {
  unidades:any[] = ["Unidad 1","Unidad 2","Unidad 3", "Unidad 4"]
  pageActual:number = 1;
  inputBuscar:boolean = false;

  personalList: any[] = [];

  key:string = 'name';
  reverse:boolean = false;
  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  form = new FormGroup({
    state: new FormControl(this.unidades[0]),
  });

  constructor(private formBuilder:FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    
    
    this.userService.getAllUsers().then(fListDep=>{
      console.log(fListDep)
      this.personalList = fListDep
    }).catch(err =>{
      console.log("error al cargar los agentes" + err);
    });
    
  }

  FormLogin(){
    console.log("hola")
  }
  selectUnidad():void{
    console.log("holaaaa")
  }

}
