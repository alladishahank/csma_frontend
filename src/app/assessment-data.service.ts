import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssessmentDataService {
  private assessmentData: any = null;

  setAssessmentData(data: any): void {
    this.assessmentData = data;
  }

  getAssessmentData(): any {
    return this.assessmentData;
  }
}
