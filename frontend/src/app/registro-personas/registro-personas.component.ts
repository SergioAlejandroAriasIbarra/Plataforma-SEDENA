import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service'; 
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro-personas',
  templateUrl: './registro-personas.component.html',
  styleUrls: ['./registro-personas.component.css']
})
export class RegistroPersonasComponent implements OnInit {
  images : string[];
  i : number;
  res : boolean = false;
  idcard:string = "";

  formReg: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    puesto: ['', [Validators.required]],
    matricula: ['', [Validators.required]],
    unidad: ['', [Validators.required]]
  }
  )


  constructor(private formBuilder: FormBuilder,private userService:UserService,private storage: Storage, private router: Router) {
    this.images = [];
    this.i = 0;
   }

  ngOnInit(): void {
    this.getImages1();
  }



  UploadImage($event : any){
    const file = $event.target.files[0];
    console.log(file);
    const imgRef = ref(this.storage, `images/${this.i+".jpg"}`);
    uploadBytes(imgRef, file)
    .then(response => {
    console.log(response)
    this.res = true
    })
    .catch(error => console.log(error));
    this.i++;
    }

     getImages2(){
      const imageRef = ref(this.storage, 'images');
      listAll(imageRef)
      .then(async response =>{
      console.log(response);
      this.images =[];
      let a = 1;
      this.i = response.items.length;
      for(let item of response.items){
        if(a==this.i){
          //console.log(this.i+" "+a);
          
          console.log("////////ENTRA AQUII/////////")
          const url = await getDownloadURL(item);
          this.FormRegistro(url)
        }
        console.log(this.i+" "+a);
      const url = await getDownloadURL(item);
      this.images.push(url)
      a++;
      }
      })
      .catch(error => console.log(error));
      let a = this.images.length
      console.log(a);
      console.log(this.images[a-1])
      }


      getImages1(){
        const imageRef = ref(this.storage, 'images');
        listAll(imageRef)
        .then(async response =>{
        console.log(response);
        this.images =[];
        this.i = response.items.length;
        for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url)
        }
        })
        .catch(error => console.log(error));
        let a = this.images.length
        console.log(a);
        console.log(this.images[a-1])
        }

  FormRegistro(url:string) {
    console.log("hola")
    if (this.formReg.valid) {
      
      let data = this.formReg.value;
      let temp = data.unidad.replace(/\s+/g, '')
      temp = temp.toLowerCase()
      
      let dataUsuario = {
        img: url,
        puesto: data.puesto,
        check: [],
        lname: data.name,
        matricula: data.matricula,
        idcard: this.idcard,
        fname: data.apellidos,
        lugar: temp,
        origen: temp,
        status: 0,
        color: 0
      }
      this.userService.addPersona(dataUsuario);
      console.log("//////////////////////////////");
      
      console.log(dataUsuario)
      this.router.navigate(['/main']);
    }
  }

}
