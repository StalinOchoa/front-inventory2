import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit {
  
/* sirve para manejar el formulario y hacer sus validaciones  --- !   */
  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private categoryService= inject(CategoryService);
  private dialogRef= inject(MatDialogRef);

  ngOnInit(): void {
    
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

    onSave(){
      let data = {
        name: this.categoryForm.get('name')?.value,
        description: this.categoryForm.get('description')?.value
      }
      this.categoryService.saveCategorie(data)
      .subscribe( (data : any) => {
        console.log(data);
        this.dialogRef.close(1)
      }, (error: any) => {
        this.dialogRef.close(2);
      })
    }
    onCancel(){
      this.dialogRef.close(3);
    }
  
}
