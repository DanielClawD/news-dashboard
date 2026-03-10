# News Dashboard

A live news summary blog dashboard built with Angular 17+.

## Features

- 📰 **Live Blog Feed** - Chronological display of news summaries (newest first)
- 🔍 **Filter/Search** - Filter by source, tag, or date range
- ➕ **Entry Form** - Add new news summaries easily
- 🏷️ **Tags** - Categorize entries with multiple tags
- 💾 **JSON Storage** - Simple file-based data storage

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser to `http://localhost:4200`

## Project Structure

```
news-dashboard/
├── src/
│   ├── app/
│   │   ├── live-feed/        # Main feed component
│   │   ├── entry-form/       # Add new entries
│   │   ├── entry-card/       # Single entry display
│   │   ├── filter-bar/       # Search/filter controls
│   │   ├── services/
│   │   │   └── news.service.ts
│   │   └── models/
│   │       └── news-entry.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── news-data.json            # Data storage
├── angular.json
├── package.json
└── tsconfig.app.json
```

## Usage

### Adding News Entries

Use the entry form at the top of the page to add new summaries:
- **Source** - News website (e.g., "TechCrunch", "BBC")
- **Title** - Article headline
- **Summary** - Your summary of the article
- **URL** - Link to original article
- **Tags** - Comma-separated tags (e.g., "AI, Technology")

### Filtering

Use the filter bar to:
- Search by source
- Filter by tags
- Select a date range

### Data Storage

Entries are stored in `news-data.json` in the project root. In a production environment, you would replace this with a real database or API.

## Development

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm test
```

## Customization

- Edit `src/styles.css` to change the theme
- Modify component templates in their respective folders
- Update `news-data.json` to seed initial data
