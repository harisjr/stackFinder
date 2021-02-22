import { Component, OnInit } from '@angular/core';
import { ConfigureService } from "../configure.service";
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";



import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  uploadForm: FormGroup;
  data: any;
  submitted = false;
  message:any;
  config: any;
  totalData:any;
  image:any;

  constructor(
    public Service: ConfigureService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    protected sanitizer: DomSanitizer
  ) { 
    this.data = [];
    this.config = {
      itemsPerPage: 30,
      currentPage: 1
    };
    
  }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      keyword:new FormControl('',[
        Validators.required, this.noWhitespace]),
    })

  }

  get searchFormControl() { 
    return this.uploadForm.controls;
  }

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
}

pageChanged(event){
  this.config.currentPage = event;

  this.Service.getRes(this.uploadForm.value.keyword, this.config.currentPage).subscribe((ret: any) => {
    this.data = JSON.parse(ret).items;
    this.totalData = JSON.parse(ret).quota_max;
    // console.log(this.totalData);
      this.config = {
        itemsPerPage: 30,
        currentPage: this.config.currentPage,
        totalItems: this.totalData
      };
      this.message = "";
      if(this.data.length ==0){
      this.message = "No search found";
      }
      });
      window.scrollTo(0, 0);
}

  transform(html): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  search() {
    this.submitted = true;
    if (this.uploadForm.invalid && this.uploadForm.value(" ")) {
      return;
  }
      this.Service.getRes(this.uploadForm.value.keyword, this.config.currentPage).subscribe((ret: any) => {
      this.data = JSON.parse(ret).items;
      this.totalData = JSON.parse(ret).quota_max;
      console.log(ret)
      this.config = {
        itemsPerPage: 30,
        currentPage: this.config.currentPage,
        totalItems: this.totalData
      };
      this.message = "";
      if(this.data.length ==0){
      this.message = "No search found";
      }
      });
    }

}
