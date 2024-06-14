import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CreateAssessmentModalComponent } from './create-assessment-modal/create-assessment-modal.component';
import { CreateCustomerFormComponent } from './create-customer-form/create-customer-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CreateAssessmentModalComponent,
    CreateCustomerFormComponent,
    RouterModule,
    RouterOutlet,
    HomePageComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatIconModule
  ]
})
export class AppComponent {
  title = 'csma-frontend';
}
