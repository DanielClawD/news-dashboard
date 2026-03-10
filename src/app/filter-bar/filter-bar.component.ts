import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterState } from '../models/filter-state';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-bar">
      <div class="filter-section">
        <label for="source-filter">Source</label>
        <input
          id="source-filter"
          type="text"
          [(ngModel)]="filters.source"
          (ngModelChange)="onFilterChange()"
          placeholder="Filter by source...">
      </div>
      
      <div class="filter-section">
        <label for="tag-filter">Tag</label>
        <input
          id="tag-filter"
          type="text"
          [(ngModel)]="filters.tag"
          (ngModelChange)="onFilterChange()"
          placeholder="Filter by tag...">
      </div>
      
      <div class="filter-section date-range">
        <label>Date Range</label>
        <div class="date-inputs">
          <input
            type="date"
            [(ngModel)]="filters.dateFrom"
            (ngModelChange)="onFilterChange()"
            placeholder="From">
          <span class="date-separator">to</span>
          <input
            type="date"
            [(ngModel)]="filters.dateTo"
            (ngModelChange)="onFilterChange()"
            placeholder="To">
        </div>
      </div>
      
      <div class="filter-section search-section">
        <label for="search">Search</label>
        <div class="search-input-wrapper">
          <input
            id="search"
            type="text"
            [(ngModel)]="filters.search"
            (ngModelChange)="onFilterChange()"
            placeholder="Search titles & summaries...">
          <button 
            *ngIf="hasActiveFilters()"
            class="clear-btn"
            (click)="clearFilters()"
            title="Clear all filters">
            Clear
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Output() filtersChange = new EventEmitter<FilterState>();

  filters: FilterState = {
    source: '',
    tag: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  };

  onFilterChange(): void {
    this.filtersChange.emit({ ...this.filters });
  }

  hasActiveFilters(): boolean {
    return Object.values(this.filters).some(v => v !== '');
  }

  clearFilters(): void {
    this.filters = {
      source: '',
      tag: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    };
    this.onFilterChange();
  }
}
