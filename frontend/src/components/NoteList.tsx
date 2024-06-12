import NoteCard from "./NoteCard";
import LoadingNotes from "./LoadingNotes";
import { Note } from "../interface/Note";

type Props = {
  notes: Note[];
  loading: boolean;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onArchive: (note: Note) => void;
};

const NoteList = ({ notes, loading, onEdit, onDelete, onArchive }: Props) => {
  if (loading) return <LoadingNotes />;
  if (notes.length === 0)
    return (
      <p className="text-xl font-semibold text-center text-white md:text-4xl">
        No notes available
      </p>
    );

  return (
    <section className="grid w-full max-w-[1600px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note: Note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </section>
  );
};

export default NoteList;
