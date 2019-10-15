import {CurrentBorrowedBooks} from '../../currentBorrowedBooks.model';

export interface OperationsHistoryTable {
  operationType: string;
  bookTitle: string;
  date: string;
}
