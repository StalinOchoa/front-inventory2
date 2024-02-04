import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

//rutas hijas del proyecto
const childRoutes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent }
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
    
})
export class RouterChildModule { }
