import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit {
  
/* inyectar dependencias -- sirve para manejar el formulario y hacer sus validaciones  --- !   */
  public categoryForm!: FormGroup;
  estadoFormulario: String="";
  private fb = inject(FormBuilder);
  private categoryService= inject(CategoryService);
  private dialogRef= inject(MatDialogRef);
  public data= inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log(this.data);
    this.estadoFormulario = "Agregar";
    
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
      });

    if (this.data != null){
      this.updateForm(this.data);
      this.estadoFormulario= "Actualizar"
    }
  }

    onSave(){
      let data = {
        name: this.categoryForm.get('name')?.value,
        description: this.categoryForm.get('description')?.value
      }
      if (this.data != null ){
       /*  actualizar registro */
        this.categoryService.updateCategorie(data, this.data.id)
            .subscribe ((data: any) =>{
              this.dialogRef.close(1);
            }, (error:any) => {
              this.dialogRef.close(2);
            })
      }else {
        /* creando nuevo registro */
        this.categoryService.saveCategorie(data)
        .subscribe( (data : any) => {
          console.log(data);
          this.dialogRef.close(1)
        }, (error: any) => {
          this.dialogRef.close(2);
        })
      }

      
    }
    onCancel(){
      this.dialogRef.close(3);
    }
    /* La razón por la que se utiliza any como tipo para el parámetro data es para indicar que este método
     puede aceptar cualquier tipo de dato como argumento. Usar any en TypeScript significa que 
     estás diciendo al compilador que permita cualquier tipo de valor para ese parámetro,
      sin imponer restricciones de tipo. */
    updateForm(data: any){
      this.categoryForm = this.fb.group({
        name: [data.name, Validators.required],
        description: [data.description, Validators.required]
        });
    }
  
}
