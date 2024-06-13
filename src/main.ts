import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AssessmentTableComponent } from './app/assessment-table/assessment-table.component';
import { CreateAssessmentModalComponent } from './app/create-assessment-modal/create-assessment-modal.component';
import { CreateCustomerFormComponent } from './app/create-customer-form/create-customer-form.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), 
    provideAnimations(),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(MatTableModule),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatFormFieldModule),
    importProvidersFrom(MatInputModule),
    importProvidersFrom(MatSelectModule),
    importProvidersFrom(MatButtonModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatDialogRef),
    provideRouter(routes)
  ]
});
