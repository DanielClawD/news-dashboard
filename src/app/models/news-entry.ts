export interface NewsEntry {
  id: string;
  timestamp: string;
  source: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
}

export interface NewsData {
  entries: NewsEntry[];
}
