export interface Task {
    id: number;
    title: string;
    completed: boolean;
    categoryId?: number; // para categorizar más adelante
  }