import { Component, OnInit } from '@angular/core';
import { AssessmentDataService } from '../assessment-data.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css'],
  standalone: true,
  imports: [CommonModule, MatIcon]
})
export class SummaryPageComponent implements OnInit {
goBack() {
throw new Error('Method not implemented.');
}
  assessmentData: any;
  categories: any[] = [];
  amaScore: number = 0;
  scoringLevel: string = '';

  constructor(private assessmentDataService: AssessmentDataService) {}

  ngOnInit(): void {
    this.assessmentData = this.assessmentDataService.getAssessmentData();
    this.categories = this.assessmentDataService.getCategories();
    this.calculateAmaScore();
    this.calculateCategoryScores();
  }

  calculateAmaScore(): void {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    this.categories.forEach(category => {
      category.parameters.forEach((parameter: { score: number; }) => {
        totalWeightedScore += parameter.score * category.weight;
      });
      totalWeight += category.weight * category.parameters.length;
    });

    this.amaScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
    this.scoringLevel = this.getScoringLevel(this.amaScore);
  }

  getScoringLevel(amaScore: number): string {
    if (amaScore <= 5) {
      return 'Navigator';
    } else if (amaScore <= 8) {
      return 'Voyager';
    } else {
      return 'Visionary';
    }
  }

  calculateCategoryScores(): void {
    this.categories.forEach(category => {
      const totalScore = category.parameters.reduce((sum: number, param: { score: number }) => sum + param.score, 0);
      category.categoryScore = totalScore / category.parameters.length;
    });
  }
}
