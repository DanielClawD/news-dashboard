import { Component, Output, EventEmitter, Input } from '@angular/core';
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
          [(ngModel)]="tagInput"
          (keydown.enter)="addTag()"
          (ngModelChange)="onTagInputChange($event)"
          placeholder="Type tag and press Enter...">
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
  @Input() set activeTags(tags: string[]) {
    this.filters.tags = tags;
  }

  filters: FilterState = {
    source: '',
    tags: [],
    dateFrom: '',
    dateTo: '',
    search: ''
  };
  
  tagInput = '';

  onFilterChange(): void {
    this.filtersChange.emit({ ...this.filters });
  }

  addTag(): void {
    const tag = this.tagInput.trim();
    if (tag && !this.filters.tags.includes(tag)) {
      this.filters.tags = [...this.filters.tags, tag];
      this.tagInput = '';
      this.onFilterChange();
    }
  }

  removeTag(tag: string): void {
    this.filters.tags = this.filters.tags.filter(t => t !== tag);
    this.onFilterChange();
  }

  onTagInputChange(value: string): void {
    this.tagInput = value;
  }

  hasActiveFilters(): boolean {
    return this.filters.source !== '' || 
           this.filters.tags.length > 0 || 
           this.filters.dateFrom !== '' || 
           this.filters.dateTo !== '' || 
           this.filters.search !== '';
  }

  clearFilters(): void {
    this.filters = {
      source: '',
      tags: [],
      dateFrom: '',
      dateTo: '',
      search: ''
    };
    this.tagInput = '';
    this.onFilterChange();
  }
}
