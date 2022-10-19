export class Todo {
  title: string;
  completed: boolean;
  id: number;
  userId: number;
  new: boolean = false;
  date: Date = new Date();
  toRemove: boolean = false;
}
