import { Component } from '@angular/core';
import { LiveFeedComponent } from './live-feed/live-feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LiveFeedComponent],
  template: `
    <div class="app-container" [class.dark]="isDarkMode">
      <header class="app-header">
        <h1 class="app-title">News Dashboard</h1>
        <button 
          class="theme-toggle" 
          (click)="toggleDarkMode()"
          [attr.aria-label]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </header>
      <main>
        <app-live-feed></app-live-feed>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #f9fafb;
      color: #111827;
      transition: background 0.3s ease, color 0.3s ease;
    }
    
    .app-container.dark {
      background: #111827;
      color: #f9fafb;
    }
    
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .dark .app-header {
      border-bottom-color: #374151;
    }
    
    .app-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .theme-toggle {
      background: transparent;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      padding: 0.5rem 0.75rem;
      font-size: 1.25rem;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.1s ease;
    }
    
    .theme-toggle:hover {
      background: #f3f4f6;
      transform: scale(1.05);
    }
    
    .dark .theme-toggle {
      border-color: #4b5563;
    }
    
    .dark .theme-toggle:hover {
      background: #374151;
    }
    
    main {
      padding: 1.5rem 2rem;
    }
  `]
})
export class AppComponent {
  title = 'news-dashboard';
  isDarkMode = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
