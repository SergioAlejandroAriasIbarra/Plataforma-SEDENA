import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

import { Router } from '@angular/router';



@Component({
  selector: 'app-main-sedena',
  templateUrl: './main-sedena.component.html',
  styleUrls: ['./main-sedena.component.css']
})
export class MainSedenaComponent implements OnInit {
  nohay:boolean = false;
  images: string[];
  i: number;
  bandera: number = 3;
  unidades: any[] = [{ unidad: "Unidad 1", val: 1 }, { unidad: "Unidad 2", val: 2 }, { unidad: "Todas las unidades", val: 0 }]
  pageActual: number = 1;
  inputBuscar: boolean = false;

  personalList: any[] = [];
  formReg: FormGroup = this.formBuilder.group({
    buscar: ['', [Validators.required,]],
    
  }) 

  key: string = 'name';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private formBuilder: FormBuilder, private userService: UserService, private storage: Storage, private router: Router) {
    this.images = [];
    this.i = 0;
  }

  ngOnInit(): void {
    //this.getImages();
    console.log("efe se carga aqui")
    this.userService.getAllUsers().then(fListDep => {
      console.log(fListDep)
      this.personalList = fListDep
    }).catch(err => {
      console.log("error al cargar los agentes" + err);
    });


  }

  /*async deletimg(){
    let a = "2.jpg" // Vatiable con el nombre de la imagen junto con el formato de imagen
    const imageRef = ref(this.storage, `images/${a}` Se agrega la variable del nombre de la imagen );
    //Ejecuta la función para eliminar la imagen
    deleteObject(imageRef).then(()=>{
    console.log("A huevo!")
    }).catch((error)=>{
    console.log("valio verga");
    })
    }*/

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

  eliminarRegistro(origen: string, idcard: string) {
    let datos = {
      origen: origen,
      idcard: idcard
    }
    this.userService.deletePersona(datos).then(res => {
      console.log(res);
      window.location.reload();
    }).catch(err => {
      console.log(err)
    });
  }

  formSearch(){
    console.log("hola");
    
    if(this.formReg.valid){
      this.userService.getAllUsers().then(fListDep => {
        console.log(fListDep)
        
        let valorForm = this.formReg.value 
        for (const i of this.personalList) {
          if (this.formatostring(i.fname,valorForm.buscar)||this.formatostring(i.puesto,valorForm.buscar)||this.formatostring(i.matricula,valorForm.buscar)) {
            this.personalList = [i]
            break;
          }
        }
      }).catch(err => {
        console.log("error al cargar los agentes" + err);
      });
    }
    
    
  }

  prueba(unidad: number) {
    //this.nohay = false;
    if(unidad == 1){
      this.userService.getunaUnidad("unidad1").then(res =>{
        console.log(res)
        this.personalList = res
      }).catch(err => {
        console.log("error al cargar los agentes" + err);
      });
      console.log(unidad)
      
    }
    if(unidad ==2){
      this.userService.getunaUnidad2("unidad2").then(res =>{
        console.log(res)
        this.personalList = res
      }).catch(err => {
        console.log("error al cargar los agentes" + err);
      });
      console.log(unidad)
    }
    if(unidad == 0){
      this.userService.getAllUsers().then(fListDep => {
        console.log(fListDep)
        this.personalList = fListDep
      }).catch(err => {
        console.log("error al cargar los agentes" + err);
      });
    }
  }


  formatostring(string1:string,string2:string){
    let a = string1.toUpperCase();
    let b = string2.toUpperCase();
    if(a.includes(b)){
      return true
    }
    return false
  }

}
