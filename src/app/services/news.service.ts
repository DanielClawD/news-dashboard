import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsEntry, NewsData } from '../models/news-entry';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly API_URL = 'http://localhost:3000/api/entries';
  
  private entriesSubject = new BehaviorSubject<NewsEntry[]>([]);
  public entries$ = this.entriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEntries();
  }

  private loadEntries(): void {
    this.http.get<NewsData>(this.API_URL).subscribe({
      next: (data) => {
        this.entriesSubject.next(data.entries || []);
      },
      error: (err) => {
        console.error('Failed to load entries:', err);
        this.entriesSubject.next([]);
      }
    });
  }

  getEntries(): NewsEntry[] {
    return this.entriesSubject.value;
  }

  addEntry(entry: Omit<NewsEntry, 'id' | 'timestamp'>): void {
    this.http.post<NewsEntry>(this.API_URL, entry).subscribe({
      next: (newEntry) => {
        const current = this.entriesSubject.value;
        this.entriesSubject.next([newEntry, ...current]);
      },
      error: (err) => console.error('Failed to add entry:', err)
    });
  }

  deleteEntry(id: string): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        const current = this.entriesSubject.value.filter(e => e.id !== id);
        this.entriesSubject.next(current);
      },
      error: (err) => console.error('Failed to delete entry:', err)
    });
  }
}
