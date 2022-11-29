import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  warning = false;
  formReg: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['']
    
  } 
  )
  constructor(private formBuilder: FormBuilder, 
              private userService: UserService,
              private router: Router) {

  }
  ngOnInit(): void {
  }

  FormLogin() {//Verificaciòn de login
    console.log('entra a la funcion')
    if (this.formReg.valid) {
      let data = this.formReg.value;
      let dataUs = {
        email: data.email,
        password: data.password
      }
      this.userService.login(dataUs)
      .then(response => {
        console.log(response.user.email);
        if(response.user.email){
          
        }
        this.router.navigate(['/main']);
      })
      .catch(error => {console.log(error)
        this.warning = true;
      });
    }
    else{
      this.warning = true;
    }
  }

  

}