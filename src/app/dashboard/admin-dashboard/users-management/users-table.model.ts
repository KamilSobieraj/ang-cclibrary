import {CurrentBorrowedBookDetails} from '../../currentBorrowedBookDetails.model';
import {OperationsHistoryTable} from '../../user-dashboard/operations-history/operations-history-table.model';

export interface UserTable {
  userID: string;
  userEmail: string;
  currentlyBorrowedBooks: CurrentBorrowedBookDetails;
  operationsHistory: OperationsHistoryTable
}
