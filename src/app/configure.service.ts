import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../environments/environment";
import { Observable, forkJoin, of } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class ConfigureService {
  constructor(
    private httpClient: HttpClient,
    private _myRoute: Router
  ) { }


  getRes(data: any, page: number ) {
    console.log('data',data)
    return this.httpClient.get(`https://api.stackexchange.com/2.2/search/advanced?page=${page}&order=desc&sort=activity&q=${data}&site=stackoverflow`, { responseType: "text"});
  }


}
