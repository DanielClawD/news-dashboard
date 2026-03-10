import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsEntry } from '../models/news-entry';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container" [class.collapsed]="isCollapsed">
      <button 
        class="toggle-btn" 
        (click)="toggleForm()"
        [attr.aria-expanded]="!isCollapsed">
        <span class="toggle-icon">{{ isCollapsed ? '+' : '−' }}</span>
        <span>{{ isCollapsed ? 'Add New Entry' : 'Hide Form' }}</span>
      </button>
      
      <form *ngIf="!isCollapsed" (ngSubmit)="onSubmit()" class="entry-form">
        <div class="form-row">
          <div class="form-field">
            <label for="source">Source *</label>
            <input
              id="source"
              type="text"
              [(ngModel)]="formData.source"
              name="source"
              placeholder="e.g., TechCrunch, BBC"
              required>
          </div>
          
          <div class="form-field">
            <label for="title">Title *</label>
            <input
              id="title"
              type="text"
              [(ngModel)]="formData.title"
              name="title"
              placeholder="Article title"
              required>
          </div>
        </div>
        
        <div class="form-field">
          <label for="url">URL *</label>
          <input
            id="url"
            type="url"
            [(ngModel)]="formData.url"
            name="url"
            placeholder="https://..."
            required>
        </div>
        
        <div class="form-field">
          <label for="summary">Summary *</label>
          <textarea
            id="summary"
            [(ngModel)]="formData.summary"
            name="summary"
            rows="4"
            placeholder="Write a brief summary of the article..."
            required></textarea>
        </div>
        
        <div class="form-field">
          <label for="tags">Tags</label>
          <input
            id="tags"
            type="text"
            [(ngModel)]="tagsInput"
            name="tags"
            placeholder="AI, Technology, Politics (comma separated)">
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="resetForm()">
            Clear
          </button>
          <button type="submit" class="btn-primary" [disabled]="!isValid()">
            Add Entry
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent {
  @Output() addEntry = new EventEmitter<Omit<NewsEntry, 'id' | 'timestamp'>>();
  
  isCollapsed = true;
  tagsInput = '';
  formData = {
    source: '',
    title: '',
    summary: '',
    url: '',
    tags: [] as string[]
  };

  toggleForm(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  isValid(): boolean {
    return !!(
      this.formData.source?.trim() &&
      this.formData.title?.trim() &&
      this.formData.summary?.trim() &&
      this.formData.url?.trim()
    );
  }

  onSubmit(): void {
    if (!this.isValid()) return;

    const tags = this.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    this.addEntry.emit({
      source: this.formData.source.trim(),
      title: this.formData.title.trim(),
      summary: this.formData.summary.trim(),
      url: this.formData.url.trim(),
      tags
    });

    this.resetForm();
    this.isCollapsed = true;
  }

  resetForm(): void {
    this.formData = {
      source: '',
      title: '',
      summary: '',
      url: '',
      tags: []
    };
    this.tagsInput = '';
  }
}
