export class UpdateNoteDto {
  id: string;
  description: string;
  archived: boolean;
  categories: UpdateCategoryDto[];
}

class UpdateCategoryDto {
  id: number;
  description: string;
}
