import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(public recipeService:RecipeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('query') !== null){
      this.searchText = this.route.snapshot.paramMap.get('query');
      this.recipeService.getSearchResults(this.searchText).then((res:any)=>{
        this.results = res.results;
        console.log(this.results);
      }).catch(console.error);
    }
  }

  showDetails(id:any){
    this.router.navigate(['/details', id]);
  }

  searchText:any = "";
  results:any;

}
