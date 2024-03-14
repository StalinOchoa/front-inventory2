import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
/* inyectamos el servicio de obtener categorias al componente*/
export class CategoryComponent implements OnInit {
/* inyectar dependencias en angular  */
  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

/* implementando OnInit es para cargar componentes */
  ngOnInit(): void {
    this.getCategories();
  }
 /*  aqui se setea la informacion para las tablas que viene del springboot */
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(): void {

    this.categoryService.getCategories()
      .subscribe( (data:any) => {

        console.log("respuesta categories: ", data);
        this.processCategoriesResponse(data);

      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == "00") {

      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      
      
    }

  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
      
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Categoria Agregada", "Exitosa");
        this.getCategories(); 
      }else if (result ==2) {
        this.openSnackBar("Se produjo un error al guardar categoria", "Error");
      }
    });
  }

  /* metodo edit */
  edit(id:number, name: string, description: string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: {id: id, name: name, description: description}
       });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Categoria Actualizada", "Exitosa");
        this.getCategories(); 
      }else if (result ==2) {
        this.openSnackBar("Se produjo un error al actualizar categoria", "Error");
      }
    });
  }

    delete(id: any){
      const dialogRef = this.dialog.open(ConfirmComponent, {
        data: {id: id}
         });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        
        if( result == 1){
          this.openSnackBar("Categoria Eliminada", "Exitosa");
          this.getCategories(); 
        }else if (result ==2) {
          this.openSnackBar("Se produjo un error al eliminar categoria", "Error");
        }
      });
    }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
   /*  duracion del mensaje en segundos */
   duration: 2000
  })
   

  }

}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
