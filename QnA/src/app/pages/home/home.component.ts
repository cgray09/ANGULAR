import { Component, OnInit, inject } from '@angular/core';
import { InterviewService } from '../../service/interview.service';
import {
  APIResponseModel,
  ILanguage,
  LanguageTopic,
  Question,
} from '../../model/language.model';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { QuestionCardComponent } from '../question-card/question-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, QuestionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  languagelist: ILanguage[] = [];
  service = inject(InterviewService);
  questionList:Question[]=[];
  selectedTopic:number=0;
  topicList$: Observable<LanguageTopic[]> | undefined;
  selectedLanguage: number = 0;
  ngOnInit(): void {
    this.loadLaguages();
  }

  loadLaguages() {
    this.service.getAllLanguage().subscribe((res: APIResponseModel) => {
      this.languagelist = res.data;
    });
  }

  onLanguageChange(event: any) {
    debugger;
    this.questionList=[];
    this.getQuestionByLang(event);
    this.topicList$ = this.service.getTopicBYLangId(event).pipe(
      map((item: APIResponseModel) => {
        return item.data;
      })
    );
  }

  onTopicChange(){
    this.service.getQuestionsByTopicId(this.selectedTopic).subscribe((res:APIResponseModel)=>{
      this.questionList=res.data;
    });
  }
  getQuestionByLang(id:number){
    this.service.getQuestiosByLangId(id).subscribe((res:APIResponseModel)=>{
      this.questionList=res.data;
  }) 
}
}
