import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

import { Router } from '@angular/router';



@Component({
  selector: 'app-main-sedena',
  templateUrl: './main-sedena.component.html',
  styleUrls: ['./main-sedena.component.css']
})
export class MainSedenaComponent implements OnInit {
  images : string[];
  i : number;
  unidades:any[] = [{unidad:"Unidad 1",val:1},{unidad:"Unidad 2",val:2}]
  pageActual:number = 1;
  inputBuscar:boolean = false;

  personalList: any[] = [];

  key:string = 'name';
  reverse:boolean = false;
  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private formBuilder:FormBuilder, private userService:UserService,private storage: Storage,private router: Router) { 
    this.images = [];
    this.i = 0;
  }

  ngOnInit(): void {
    //this.getImages();
    
    this.userService.getAllUsers().then(fListDep=>{
      console.log(fListDep)
      this.personalList = fListDep
    }).catch(err =>{
      console.log("error al cargar los agentes" + err);
    });
    
  }

  
  /*getImages(){
    const imageRef = ref(this.storage, 'images');
    listAll(imageRef)
    .then(async response =>{
    console.log(response);
    this.images =[];
    for(let item of response.items){
    const url = await getDownloadURL(item);
    this.images.push(url)
    }
    })
    .catch(error => console.log(error));
    let a = this.images.length
    console.log(a);
    console.log(this.images[a-1])
    }*/
  
  eliminarRegistro(origen:string,idcard:string){
    let datos = {
      origen: origen,
      idcard: idcard
    }
    this.userService.deletePersona(datos).then(res =>{
      console.log(res);
      window.location.reload();
    }).catch(err =>{
      console.log(err)
    });
  }
  
}
