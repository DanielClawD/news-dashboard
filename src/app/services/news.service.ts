import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NewsEntry, NewsData } from '../models/news-entry';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly STORAGE_KEY = 'news_data';
  private readonly DATA_URL = 'news-data.json';
  
  private entriesSubject = new BehaviorSubject<NewsEntry[]>([]);
  public entries$ = this.entriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEntries();
  }

  private loadEntries(): void {
    // First try to load from localStorage for persistence
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const data: NewsData = JSON.parse(saved);
      this.entriesSubject.next(data.entries || []);
    } else {
      // Load initial data from JSON file
      this.http.get<NewsData>(this.DATA_URL).pipe(
        catchError(() => of({ entries: [] }))
      ).subscribe(data => {
        this.entriesSubject.next(data.entries || []);
        this.saveToStorage();
      });
    }
  }

  private saveToStorage(): void {
    const data: NewsData = { entries: this.entriesSubject.value };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getEntries(): NewsEntry[] {
    return this.entriesSubject.value;
  }

  addEntry(entry: Omit<NewsEntry, 'id' | 'timestamp'>): void {
    const newEntry: NewsEntry = {
      ...entry,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    
    const current = this.entriesSubject.value;
    this.entriesSubject.next([newEntry, ...current]);
    this.saveToStorage();
  }

  deleteEntry(id: string): void {
    const current = this.entriesSubject.value.filter(e => e.id !== id);
    this.entriesSubject.next(current);
    this.saveToStorage();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
