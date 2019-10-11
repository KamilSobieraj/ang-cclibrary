import {CurrentBorrowedBooks} from './currentBorrowedBooks.model';

export interface User {
  id: string;
  userType: string;
  email: string;
  password: string;
  userName?: string;
  history: string[];
  currentBorrowedBooks: CurrentBorrowedBooks[];
}
