import { Component, OnInit } from '@angular/core';
import { AssessmentDataService } from '../assessment-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-assessment-form',
  templateUrl: './new-assessment-form.component.html',
  styleUrls: ['./new-assessment-form.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NewAssessmentFormComponent implements OnInit {
  assessmentData: any = {};

  constructor(private assessmentDataService: AssessmentDataService) {}

  ngOnInit(): void {
    this.assessmentData = this.assessmentDataService.getAssessmentData();
  }
}
