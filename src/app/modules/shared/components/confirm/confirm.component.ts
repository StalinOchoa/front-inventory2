import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{
  
  private categoryService= inject(CategoryService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  
  ngOnInit(): void {
    
  }
  onNoClick(){
    /* al mandar 3 el componente padre no  hará nada */
    this.dialogRef.close(3)
  }

  delete(){
    /* si la data es distinto que nulo */
    if (this.data != null){
      this.categoryService.daleteCategorie(this.data.id).
          subscribe((data:any) => {
            this.dialogRef.close(1);
            /* caso contario mandamos un error */
          }, (error: any) => {
            this.dialogRef.close(2);
          })
         /*  si el if no se completa o no viene el ID */
    }else {
      this.dialogRef.close(2);
    }
  }

}
