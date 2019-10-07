export interface Book {
  id: string;
  title: string;
  author?: string;
  publicationYear?: string;
  editorName?: string;
  tags?: string[];
  remarks?: string;
  currentLocation: string;
  isAvailable: boolean;
  history: string[];
  reservations?: string[];
  bookCoverUrl?: string;
}
