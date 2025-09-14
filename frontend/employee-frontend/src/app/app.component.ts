import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { Employee } from './models/employee.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, EmployeeFormComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Employee Directory';

  editModel: Employee | null = null;
  onEditRequested(e: Employee) { this.editModel = { ...e }; }
  onSaved() { this.editModel = null; } // form emits saved after create/update
  onListChanged() { this.editModel = null; } // unused now but safe to keep
}
