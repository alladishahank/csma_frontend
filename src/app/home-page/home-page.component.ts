import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAssessmentModalComponent } from '../create-assessment-modal/create-assessment-modal.component';
import { AssessmentTableComponent } from '../assessment-table/assessment-table.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AssessmentTableComponent,
    MatButtonModule
  ]
})
export class HomePageComponent {
  constructor(public dialog: MatDialog) {}

  openCreateAssessmentModal(): void {
    const dialogRef = this.dialog.open(CreateAssessmentModalComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Optionally, you can refresh the table data here
    });
  }
}
