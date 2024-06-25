import { Component, OnInit } from '@angular/core';
import { AssessmentDataService } from '../assessment-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-new-assessment-form',
  templateUrl: './new-assessment-form.component.html',
  styleUrls: ['./new-assessment-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule] 
})
export class NewAssessmentFormComponent implements OnInit {
  assessmentData: any = {};
  categories: any[] = [];

  constructor(private assessmentDataService: AssessmentDataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.assessmentData = this.assessmentDataService.getAssessmentData();
    if (this.assessmentData) {
      this.fetchCategories();
    }
  }

  fetchCategories(): void {
    this.assessmentDataService.fetchCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.categories.forEach(category => {
          category.parameters.forEach((parameter: { score: number; }) => {
            parameter.score = parameter.score || 0;
          });
        });
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  onNext(): void {
    console.log('Next button clicked');
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const json = JSON.parse(e.target.result);
        this.assessmentData = json;
        this.fetchCategories();  
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  }
}
