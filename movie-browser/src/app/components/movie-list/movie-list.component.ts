import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {

  movies!: any[];

  constructor(private service: MoviesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      qparams=>{
        let q  = qparams['q'] ? qparams['q'] : "X-Men";
        console.log("qparams: ", qparams)
        this.service.searchMovies(q)
          .subscribe(resp=>this.movies=resp.Search)
      }
    );
  }
}
