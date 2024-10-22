import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public recipeService:RecipeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeInformation(this.id).then((res:any)=>{
      console.log("Res: ", res);
      console.log("Res: ", res.extendedIngredients[0].name);
      this.details = res;
    }).catch(console.error);
    this.recipeService.getInstructions(this.id).then((res:any)=>{
      this.steps = res[0].steps;
      console.log(this.steps);
    }).catch(console.error);
  }

  id:any;
  details:any;
  steps:any;

}
