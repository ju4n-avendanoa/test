import {
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Note } from "../interface/Note";
import CategoryTag from "./CategoryTag";

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onArchive: (note: Note) => void;
};

const NoteCard = ({ note, onEdit, onDelete, onArchive }: Props) => (
  <article className="relative flex flex-col gap-2 justify-between p-6 text-white bg-zinc-800 h-[250px] rounded-lg">
    <p className="w-full overflow-auto grow min-h-[120px]">
      {note.description}
    </p>
    <div className="flex flex-wrap gap-2 overflow-auto">
      {note.categories.map((category) => (
        <CategoryTag key={category.id} description={category.description} />
      ))}
    </div>
    <ArrowUpTrayIcon
      width={30}
      height={30}
      className="-top-4 p-0.5 rounded-lg hover:bg-emerald-500 hover:cursor-pointer absolute right-24 bg-emerald-700"
      title="archive"
      onClick={() => onArchive(note)}
    />
    <PencilIcon
      width={30}
      height={30}
      className="-top-4 p-0.5 rounded-lg hover:bg-sky-500 hover:cursor-pointer absolute right-14 bg-sky-700"
      onClick={() => onEdit(note)}
      title="edit"
    />
    <TrashIcon
      width={30}
      height={30}
      className="-top-4 p-0.5 rounded-lg hover:bg-red-500 hover:cursor-pointer absolute right-4 bg-red-700"
      onClick={() => onDelete(note)}
      title="delete"
    />
  </article>
);

export default NoteCard;
