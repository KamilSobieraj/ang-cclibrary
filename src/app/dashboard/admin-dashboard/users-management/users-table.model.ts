import {CurrentBorrowedBookDetails} from '../../currentBorrowedBookDetails.model';
import {OperationsHistoryTable} from '../../../shared/operations-history/operations-history-table.model';

export interface UserTable {
  userID: string;
  userEmail: string;
  currentlyBorrowedBooks: CurrentBorrowedBookDetails;
  operationsHistory: OperationsHistoryTable
}
