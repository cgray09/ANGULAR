import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public email: any;
  public ingredients: Ingredient[];

  constructor(name: string, email: any, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.email = email;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;

  }
}
