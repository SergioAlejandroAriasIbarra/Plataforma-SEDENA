import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainSedenaComponent } from './main-sedena/main-sedena.component';
import { RegistroPersonasComponent } from './registro-personas/registro-personas.component';




const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'main', component: MainSedenaComponent},
  {path: 'login',component: LoginComponent},
  {path: 'registro',component:RegistroPersonasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
