import { useEffect, useState } from "react";
import { getTasks } from "./actions/getTasks";
import { Note } from "./interface/Note";
import MarginContainer from "./components/MarginContainer";
import NoteFormModal from "./components/NoteFormModal";
import archiveTask from "./actions/archiveTask";
import deleteTask from "./actions/deleteTask";
import createTask from "./actions/createTask";
import editTask from "./actions/editTask";
import NoteList from "./components/NoteList";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [showArchivedNotes, setShowArchivedNotes] = useState(false);
  const [showActiveNotes, setShowActiveNotes] = useState(true);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [newCategories, setNewCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const notes = await getTasks();
        const archivedNotes: Note[] = [];
        const activeNotes: Note[] = [];

        notes.forEach((note: Note) => {
          if (note.archived) {
            archivedNotes.push(note);
          } else {
            activeNotes.push(note);
          }
        });

        setArchivedNotes(archivedNotes);
        setNotes(activeNotes);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const onSubmit = async () => {
    try {
      const noteDescription =
        description.trim() === "" ? "Empty Note" : description;

      if (editingId) {
        const note =
          notes.find((note) => note.id === editingId) ||
          archivedNotes.find((note) => note.id === editingId);
        if (!note) {
          return;
        }

        // Crear la estructura del objeto para la actualización
        const updatedNote = {
          ...note,
          description: noteDescription,
          categories: newCategories.map((category, index) => ({
            id: note.categories[index]?.id,
            description: category,
          })),
        };

        setEditingId(null);
        await editTask(updatedNote);

        if (note.archived) {
          setArchivedNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === editingId ? updatedNote : note
            )
          );
        } else {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note.id === editingId ? updatedNote : note
            )
          );
        }
      } else {
        const note = await createTask(noteDescription, newCategories);
        console.log(note);
        setNotes((prev) => [...prev, note]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
      setDescription("");
      setNewCategories([]);
    }
  };

  const onDeleteTask = async (note: Note) => {
    try {
      await deleteTask(note);
      if (note.archived) {
        setArchivedNotes((prev) => prev.filter((n) => n.id !== note.id));
      } else {
        setNotes((prev) => prev.filter((n) => n.id !== note.id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onArchiveTask = async (note: Note) => {
    try {
      const updatedNote = await archiveTask(note);
      if (note.archived) {
        setArchivedNotes((prev) => prev.filter((n) => n.id !== updatedNote.id));
        setNotes((prev) => [...prev, updatedNote]);
      } else {
        setArchivedNotes((prev) => [...prev, updatedNote]);
        setNotes((prev) => prev.filter((n) => n.id !== updatedNote.id));
      }
    } catch (error) {
      console.error("Error archiving task:", error);
    }
  };

  const filterNotes = (notes: Note[]) => {
    if (search.trim() === "") {
      return notes;
    }
    return notes.filter((note) =>
      note.categories.some((category) =>
        category.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const filteredActiveNotes = filterNotes(notes);
  const filteredArchivedNotes = filterNotes(archivedNotes);

  return (
    <section className="bg-[#2f2f2f] w-full min-h-screen min-w-[320px]">
      <Navbar onAddNote={() => setOpen(true)} />
      <MarginContainer>
        <section className="flex flex-col items-center justify-center w-full gap-20">
          <section className="flex flex-col items-center justify-center w-full gap-6 md:gap-4 lg:gap-10 md:flex-row">
            <Button
              isActive={showActiveNotes}
              onClick={() => {
                setShowArchivedNotes(false);
                setShowActiveNotes(true);
              }}
              label="show active notes"
            />

            <Button
              isActive={showArchivedNotes}
              onClick={() => {
                setShowActiveNotes(false);
                setShowArchivedNotes(true);
              }}
              label="show archived notes"
            />

            <input
              type="text"
              placeholder="Search"
              className="w-[185px] px-4 py-2 text-white rounded-md bg-zinc-700"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </section>

          {showActiveNotes ? (
            <NoteList
              notes={filteredActiveNotes}
              loading={loading}
              onEdit={(note: Note) => {
                setDescription(note.description);
                setEditingId(note.id);
                setNewCategories(
                  note.categories.map((category) => category.description)
                );
                setOpen(true);
              }}
              onDelete={onDeleteTask}
              onArchive={onArchiveTask}
            />
          ) : null}

          {showArchivedNotes ? (
            <NoteList
              notes={filteredArchivedNotes}
              loading={false}
              onEdit={(note: Note) => {
                setDescription(note.description);
                setEditingId(note.id);
                setNewCategories(
                  note.categories.map((category) => category.description)
                );
                setOpen(true);
              }}
              onDelete={onDeleteTask}
              onArchive={onArchiveTask}
            />
          ) : null}
        </section>
        <NoteFormModal
          isOpen={open}
          description={description}
          setDescription={setDescription}
          newCategories={newCategories}
          setNewCategories={setNewCategories}
          onSave={onSubmit}
          onClose={() => {
            setDescription("");
            setEditingId(null);
            setOpen(false);
            setNewCategories([]);
          }}
        />
      </MarginContainer>
    </section>
  );
}

export default App;
