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
    this.router.navigate(['/assessment-summary']);
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
        
        // CHANGE: Preserve existing assessment data while incorporating new data
        this.assessmentData = {
          ...this.assessmentData,  // Spread existing data
          ...json,                 // Spread new data (will overwrite existing properties if present in json)
          categories: json.categories || this.assessmentData.categories  // Use new categories if present, otherwise keep existing
        };
  
        // CHANGE: Call method to update categories
        this.updateCategoriesWithUploadedData();
      } 
      catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  }
  
  updateCategoriesWithUploadedData(): void {
    if (this.assessmentData && this.assessmentData.categories) {
      this.categories = this.assessmentData.categories.map((uploadedCategory: any) => {
        const existingCategory = this.categories.find(c => c.name === uploadedCategory.name);
        if (existingCategory) {
          existingCategory.parameters = existingCategory.parameters.map((param: any) => {
            const uploadedParam = uploadedCategory.parameters.find((p: any) => p.name === param.name);
            return {
              ...param,
              score: uploadedParam ? uploadedParam.score : param.score
            };
          });
          return existingCategory;
        }
        return uploadedCategory;
      });
    }
  }
}
