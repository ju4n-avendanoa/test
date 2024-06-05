import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { getTasks } from "./actions/getTasks";
import { toast } from "sonner";
import { Note } from "./interface/Note";
import MarginContainer from "./components/MarginContainer";
import LoadingNotes from "./components/LoadingNotes";
import archiveTask from "./actions/archiveTask";
import deleteTask from "./actions/deleteTask";
import createTask from "./actions/createTask";
import editTask from "./actions/editTask";
import "./App.css";

function App() {
  const [showArchivedNotes, setShowArchivedNotes] = useState(false);
  const [showActiveNotes, setShowActiveNotes] = useState(true);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
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
        const note = notes.find((note) => note.id === editingId);
        if (!note) {
          return;
        }
        const updatedNote = { ...note, description: noteDescription };
        setEditingId(null);
        await editTask(updatedNote);
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === editingId ? updatedNote : note))
        );
      } else {
        const note = await createTask(noteDescription);
        setNotes((prev) => [...prev, note]);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setOpen(false);
      setDescription("");
    }
  };

  const onChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const onDeleteTask = async (note: Note) => {
    try {
      await deleteTask(note);
      setNotes((prev) => prev.filter((n) => n.id !== note.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onArchiveTask = async (note: Note) => {
    try {
      await archiveTask(note);
      setArchivedNotes((prev) => [...prev, note]);
      setNotes((prev) => prev.filter((n) => n.id !== note.id));
    } catch (error) {
      console.error("Error archiving task:", error);
    }
  };

  console.log(notes);

  return (
    <section className="bg-[#2f2f2f] w-full min-h-screen min-w-[320px]">
      <nav className="sticky top-0 z-10 flex items-center justify-around w-full py-6 bg-zinc-900">
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Notes
        </h1>
        <button
          className="flex items-center gap-4 px-4 py-2 transition duration-150 border-2 rounded-md border-sky-300 hover:scale-105 bg-sky-700"
          onClick={() => setOpen(true)}
        >
          <span className="hidden font-semibold text-white sm:block">
            Add new note
          </span>
          <PlusIcon className="w-6 h-6 text-white border-2 border-white rounded-full" />
        </button>
      </nav>
      <MarginContainer>
        <section className="flex flex-col items-center justify-center w-full gap-20">
          <section className="flex items-center justify-center w-full gap-20">
            <button
              className={`${
                showActiveNotes
                  ? "scale-95 shadow-md shadow-sky-300 bg-sky-900"
                  : "scale-100"
              } px-4 py-2 text-white border-2 rounded-md bg-sky-700 border-sky-500`}
              onClick={() => {
                setShowArchivedNotes(false);
                setShowActiveNotes(true);
              }}
            >
              show active notes
            </button>
            <button
              className={`${
                showArchivedNotes
                  ? "scale-95 shadow-md shadow-sky-300 bg-sky-900"
                  : "scale-100"
              } px-4 py-2 text-white border-2 rounded-md bg-sky-700 border-sky-500`}
              onClick={() => {
                setShowActiveNotes(false);
                setShowArchivedNotes(true);
              }}
            >
              show archived notes
            </button>
          </section>

          {showActiveNotes ? (
            loading ? (
              <LoadingNotes />
            ) : notes.length === 0 ? (
              <p className="text-4xl font-semibold text-white">
                You do not have any active notes yet
              </p>
            ) : (
              <section className="grid w-full max-w-[1600px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                  <article
                    key={note.id}
                    className="relative flex justify-between p-6 text-white bg-zinc-800 h-[250px] rounded-lg"
                  >
                    <p className="w-full overflow-auto">{note.description}</p>
                    <ArrowUpTrayIcon
                      width={30}
                      height={30}
                      className="-top-4 p-0.5 rounded-lg hover:bg-emerald-500 hover:cursor-pointer absolute right-24 bg-emerald-700"
                      title="archive"
                      onClick={() => onArchiveTask(note)}
                    />
                    <PencilIcon
                      width={30}
                      height={30}
                      className="-top-4 p-0.5 rounded-lg hover:bg-sky-500 hover:cursor-pointer absolute right-14 bg-sky-700"
                      onClick={() => {
                        setDescription(note.description);
                        setEditingId(note.id);
                        setOpen(true);
                      }}
                      title="edit"
                    />
                    <TrashIcon
                      width={30}
                      height={30}
                      className="-top-4 p-0.5 rounded-lg hover:bg-red-500 hover:cursor-pointer absolute right-4 bg-red-700"
                      onClick={() => onDeleteTask(note)}
                      title="delete"
                    />
                  </article>
                ))}
              </section>
            )
          ) : null}

          {showArchivedNotes ? (
            archivedNotes.length === 0 ? (
              <p className="text-4xl font-semibold text-white">
                You do not have any archived notes yet
              </p>
            ) : (
              <section className="grid w-full max-w-[1600px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {archivedNotes.map((note) => (
                  <article
                    key={note.id}
                    className="relative flex justify-between p-6 text-white bg-zinc-800 h-[250px] rounded-lg"
                  >
                    <p className="w-full overflow-auto">{note.description}</p>
                    <ArrowDownTrayIcon
                      width={30}
                      height={30}
                      className="-top-4 p-0.5 rounded-lg hover:bg-emerald-500 hover:cursor-pointer absolute right-24 bg-emerald-700"
                      title="unarchive"
                      onClick={() => onArchiveTask(note)}
                    />
                    <PencilIcon
                      width={30}
                      height={30}
                      className="-top-4 p-0.5 rounded-lg hover:bg-sky-500 hover:cursor-pointer absolute right-14 bg-sky-700"
                      onClick={() => {
                        setDescription(note.description);
                        setEditingId(note.id);
                        setOpen(true);
                      }}
                      title="edit"
                    />
                    <TrashIcon
                      width={30}
                      height={30}
                      className="-top-4 p-0.5 rounded-lg hover:bg-red-500 hover:cursor-pointer absolute right-4 bg-red-700"
                      onClick={() => onDeleteTask(note)}
                      title="delete"
                    />
                  </article>
                ))}
              </section>
            )
          ) : null}
        </section>
        {open && (
          <section className="fixed top-0 z-20 flex items-center justify-center w-full h-full backdrop-blur-sm">
            <div className="relative flex flex-col w-5/6 gap-4 md:w-1/2 lg:w-2/5 h-2/5 max-w-[600px] ">
              <div className="flex justify-end">
                <XCircleIcon
                  width={30}
                  height={30}
                  className="cursor-pointer text-zinc-200 hover:text-sky-300"
                  onClick={() => {
                    setDescription("");
                    setEditingId(null);
                    setOpen(false);
                  }}
                />
              </div>
              <textarea
                className="w-full h-full p-4 text-white rounded-md bg-zinc-700"
                onChange={onChangeDescription}
                value={description}
              />
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white transition border-2 rounded-md hover:bg-sky-900 duration- bg-sky-700 border-sky-300 hover:border-sky-500 active:scale-95"
                onClick={() => onSubmit()}
              >
                Save
              </button>
            </div>
          </section>
        )}
      </MarginContainer>
    </section>
  );
}

export default App;
