import {
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const NoteCard = ({ note, onEdit, onDelete, onArchive }: any) => (
  <article className="relative flex justify-between p-6 text-white bg-zinc-800 h-[250px] rounded-lg">
    <p className="w-full overflow-auto">{note.description}</p>
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
