import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NewsService } from '../services/news.service';
import { NewsEntry } from '../models/news-entry';
import { FilterState } from '../models/filter-state';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { EntryCardComponent } from '../entry-card/entry-card.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-live-feed',
  standalone: true,
  imports: [CommonModule, EntryFormComponent, EntryCardComponent, FilterBarComponent],
  template: `
    <div class="live-feed">
      <header class="feed-header">
        <h1>📰 Live News Summary</h1>
        <p class="feed-subtitle">Curated news summaries and insights</p>
      </header>
      
      <app-entry-form 
        (addEntry)="onAddEntry($event)">
      </app-entry-form>
      
      <app-filter-bar 
        (filtersChange)="onFiltersChange($event)">
      </app-filter-bar>
      
      <div class="entries-container">
        <div class="entries-header">
          <span class="entries-count">
            {{ filteredEntries.length }} 
            {{ filteredEntries.length === 1 ? 'entry' : 'entries' }}
          </span>
          <span class="last-updated" *ngIf="filteredEntries.length > 0">
            Last updated: {{ getLastUpdated() }}
          </span>
        </div>
        
        <div class="entries-list" *ngIf="filteredEntries.length > 0">
          <app-entry-card
            *ngFor="let entry of filteredEntries"
            [entry]="entry"
            (delete)="onDeleteEntry($event)"
            (tagClick)="onTagClick($event)">
          </app-entry-card>
        </div>
        
        <div class="empty-state" *ngIf="filteredEntries.length === 0">
          <div class="empty-icon">📭</div>
          <h3>No entries found</h3>
          <p *ngIf="hasActiveFilters()">
            Try adjusting your filters or 
            <button class="link-btn" (click)="clearFilters()">clear all filters</button>
          </p>
          <p *ngIf="!hasActiveFilters()">
            Get started by adding your first news entry above.
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./live-feed.component.css']
})
export class LiveFeedComponent implements OnInit, OnDestroy {
  entries: NewsEntry[] = [];
  filteredEntries: NewsEntry[] = [];
  currentFilters: FilterState = {
    source: '',
    tag: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  };
  
  private subscription?: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.subscription = this.newsService.entries$.subscribe(entries => {
      this.entries = entries;
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onAddEntry(entry: Omit<NewsEntry, 'id' | 'timestamp'>): void {
    this.newsService.addEntry(entry);
  }

  onDeleteEntry(id: string): void {
    this.newsService.deleteEntry(id);
  }

  onFiltersChange(filters: FilterState): void {
    this.currentFilters = filters;
    this.applyFilters();
  }

  onTagClick(tag: string): void {
    this.currentFilters.tag = tag;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return Object.values(this.currentFilters).some(v => v !== '');
  }

  clearFilters(): void {
    this.currentFilters = {
      source: '',
      tag: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    };
    this.applyFilters();
  }

  getLastUpdated(): string {
    if (this.filteredEntries.length === 0) return '';
    const latest = new Date(this.filteredEntries[0].timestamp);
    return latest.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private applyFilters(): void {
    let result = [...this.entries];
    const f = this.currentFilters;

    // Source filter
    if (f.source?.trim()) {
      const search = f.source.toLowerCase();
      result = result.filter(e => e.source.toLowerCase().includes(search));
    }

    // Tag filter
    if (f.tag?.trim()) {
      const search = f.tag.toLowerCase();
      result = result.filter(e => 
        e.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    // Date range filter
    if (f.dateFrom) {
      const fromDate = new Date(f.dateFrom);
      result = result.filter(e => new Date(e.timestamp) >= fromDate);
    }
    if (f.dateTo) {
      const toDate = new Date(f.dateTo);
      toDate.setHours(23, 59, 59, 999);
      result = result.filter(e => new Date(e.timestamp) <= toDate);
    }

    // Search filter (title and summary)
    if (f.search?.trim()) {
      const search = f.search.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(search) ||
        e.summary.toLowerCase().includes(search)
      );
    }

    // Sort by timestamp (newest first)
    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    this.filteredEntries = result;
  }
}
