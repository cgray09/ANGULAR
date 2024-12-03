import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/language.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  apiEndpoint:string='https://freeapi.gerasim.in/api/Interview/';

  constructor(private http:HttpClient) { 

  }
  
  getAllLanguage():Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiEndpoint+'getAllLanguage');
  }

  getTopicBYLangId(langId:number):Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(this.apiEndpoint+'GetLanguageTopicById?id='+langId)
  }


  getQuestionsByTopicId(topicId:number):Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(this.apiEndpoint+'/GetQuestionByTopicId?id='+topicId)
  }

  getQuestiosByLangId(langId:number):Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(this.apiEndpoint+'/GetAllQuestionsByLanguageId?id='+langId) 
  }
}
