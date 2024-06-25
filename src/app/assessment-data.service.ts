import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentDataService {
  private assessmentData: any;

  constructor(private http: HttpClient) {}

  setAssessmentData(data: any): void {
    this.assessmentData = data;
  }

  getAssessmentData(): any {
    return this.assessmentData;
  }

  fetchCategories(): Observable<any> {
    const url = 'http://localhost:8080/api/categories/withParameters';
    return this.http.get<any>(url);
  }
}
