// src/app/components/employee-list.component.ts
import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  searchText = '';
  deptFilter = '';
  loading = false;
  error: string | null = null;
  private sub = new Subscription();

  @Output() edit = new EventEmitter<Employee>();
  @Output() changed = new EventEmitter<void>();

  constructor(private svc: EmployeeService) {}

  ngOnInit() {
    // Subscribe to employees$ to always get the latest list
    this.sub.add(
      this.svc.employees$.subscribe({
        next: (list) => { this.employees = list; this.loading = false; },
        error: () => { this.error = 'Failed to load employees'; this.loading = false; }
      })
    );

    // ensure initial load (service already triggers initial load in constructor, but safe to call)
    this.reload();
  }

  reload() {
    this.loading = true;
    this.svc.load().subscribe({
      next: () => { this.loading = false; },
      error: () => { this.error = 'Reload failed'; this.loading = false; }
    });
  }

  load() { this.reload(); } // alias kept for compatibility

  onSearch() {
    if (!this.searchText && !this.deptFilter) {
      this.reload();
      return;
    }
    this.loading = true;
    this.svc.search(this.deptFilter, this.searchText).subscribe({
      next: () => { this.loading = false; },
      error: () => { this.error = 'Search failed'; this.loading = false; }
    });
  }

  onDelete(id?: number) {
    if (!id) return;
    if (!confirm('Delete this employee?')) return;
    this.svc.delete(id).subscribe({
      next: (resp) => {
        // service will call load() and update employees$; UI will update automatically
        this.changed.emit();
      },
      error: () => { alert('Delete failed'); }
    });
  }

  onEdit(e: Employee) {
    this.edit.emit(e);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
