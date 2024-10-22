import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  public getSearchResults(searchText:any){
    return new Promise((resolve, reject)=>{
      this.http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&number=5&apiKey=d7de66eae26449be8fcc6320812e027d`).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }


  public getRecipeInformation(id:any){
    return new Promise((resolve, reject)=>{
      this.http.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=d7de66eae26449be8fcc6320812e027d`).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }

  public getInstructions(id:any){
    return new Promise((resolve, reject)=>{
      this.http.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=d7de66eae26449be8fcc6320812e027d`).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }


}
