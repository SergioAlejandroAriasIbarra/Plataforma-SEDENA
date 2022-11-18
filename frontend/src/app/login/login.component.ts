import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  warning = false;
  formReg: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
    
  }, {
    validators: () => {
      if (!this.formReg) return;
      /*if (this.formReg.controls.password.value == this.formReg.controls.confirmpass.value) {
        return null;
      } else {
        return {
          confirmPassword: true
        }
      }*/
    }
  })
  constructor(private formBuilder: FormBuilder) {

  }
  FormLogin() {//Verificaciòn de login
    console.log('entra a la funcion')
    if (this.formReg.valid) {
      let data = this.formReg.value;
      let dataUs = {
        email: data.email,
        password: data.password
      }
      console.log('form valido', dataUs);
    }
    else{
      this.warning = true;
    }
  }

}