export class Note {
  id: number;
  description: string;
  category?: { id: number; description: string }[];
  archived: boolean;
}
