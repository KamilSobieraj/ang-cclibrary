import {CurrentBorrowedBookBasic} from '../../../shared/user-current-borrowed-books/currentBorrowedBookBasic.model';

export interface AddUpdateBook {
  id: string;
  title: string,
  author: string,
  publicationYear: string,
  editorName: string,
  tags: string[],
  remarks: string,
  currentLocation: string,
  bookCoverUrl: string
}
