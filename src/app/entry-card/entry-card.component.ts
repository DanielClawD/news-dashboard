import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsEntry } from '../models/news-entry';

@Component({
  selector: 'app-entry-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="entry-card">
      <header class="entry-header">
        <div class="entry-meta">
          <span class="entry-source">{{ entry.source }}</span>
          <span class="entry-time">{{ formatDate(entry.timestamp) }}</span>
        </div>
        <button 
          class="delete-btn" 
          (click)="onDelete()"
          title="Delete entry">
          ×
        </button>
      </header>
      
      <h2 class="entry-title">
        <a [href]="entry.url" target="_blank" rel="noopener">
          {{ entry.title }}
        </a>
      </h2>
      
      <p class="entry-summary">{{ entry.summary }}</p>
      
      <footer class="entry-footer">
        <div class="entry-tags">
          <span 
            class="tag" 
            *ngFor="let tag of entry.tags"
            (click)="onTagClick(tag)">
            {{ tag }}
          </span>
        </div>
        <a 
          [href]="entry.url" 
          target="_blank" 
          rel="noopener"
          class="read-more">
          Read original →
        </a>
      </footer>
    </article>
  `,
  styleUrls: ['./entry-card.component.css']
})
export class EntryCardComponent {
  @Input({ required: true }) entry!: NewsEntry;
  @Output() delete = new EventEmitter<string>();
  @Output() tagClick = new EventEmitter<string>();

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }

  onDelete(): void {
    if (confirm('Delete this entry?')) {
      this.delete.emit(this.entry.id);
    }
  }

  onTagClick(tag: string): void {
    this.tagClick.emit(tag);
  }
}
