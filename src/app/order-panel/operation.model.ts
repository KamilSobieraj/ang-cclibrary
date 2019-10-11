export interface Operation {
  id: string;
  bookID: string;
  date: string;
  userID: string;
  operationType: string;
  movedTo?: string;
}
