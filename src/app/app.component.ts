import { Component } from '@angular/core';
import { LiveFeedComponent } from './live-feed/live-feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LiveFeedComponent],
  template: `<app-live-feed></app-live-feed>`,
  styles: [``]
})
export class AppComponent {
  title = 'news-dashboard';
}
