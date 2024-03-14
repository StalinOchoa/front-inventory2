import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";
/* sirve para conectar a otros servicios o API REST */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /* Metodo para obtener Categorias y se va armar los endpoints */
  /**
   * 
   * get all categories 
   */
  getCategories(){

    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);

  }

  /**
   * save the categories
   */
saveCategorie(body: any){
  const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

/**
 * actualizar categoria
 */

updateCategorie(body: any, id: any){
  const endpoint = `${base_url}/categories/ ${id}`;
  return this.http.put(endpoint, body);
}

}
