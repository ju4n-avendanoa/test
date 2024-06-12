import { Category } from "./Category";

export type Note = {
  id: string;
  description: string;
  categories: Category[];
  archived: boolean;
};
