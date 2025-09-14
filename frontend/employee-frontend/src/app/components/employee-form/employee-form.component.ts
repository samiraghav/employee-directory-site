// src/app/components/employee-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  @Input() set editModel(value: Employee | null) {
    if (value) {
      this.model = { ...value };
      if (this.model.joinDate) this.model.joinDate = this.model.joinDate.slice(0, 10);
      this.isEdit = true;
    } else {
      this.reset();
    }
  }
  @Output() saved = new EventEmitter<void>();
  model: Employee = { name: '', department: '', email: '', joinDate: '' };
  isEdit = false;
  saving = false;
  error: string | null = null;

  constructor(private svc: EmployeeService) {}

  submit(f?: NgForm) {
    this.error = null;
    if (!this.model.name || !this.model.department || !this.model.email) {
      this.error = 'Fill required fields';
      return;
    }

    this.saving = true;
    const op = this.isEdit && this.model.id
      ? this.svc.update(this.model.id, this.model)
      : this.svc.create(this.model);

    op.subscribe({
      next: () => {
        this.saving = false;
        this.reset();
        this.saved.emit();
        // no need to call any parent reload; service updates employees$ internally
      },
      error: (err) => {
        this.saving = false;
        this.error = this.parseError(err);
      }
    });
  }

  reset() {
    this.model = { name: '', department: '', email: '', joinDate: '' };
    this.isEdit = false;
    this.error = null;
  }

  private parseError(err: any) {
    try {
      if (err?.error) {
        if (typeof err.error === 'string') return err.error;
        if (typeof err.error === 'object') return JSON.stringify(err.error);
      }
      return err?.message ?? 'Unknown error';
    } catch {
      return 'Error';
    }
  }
}
