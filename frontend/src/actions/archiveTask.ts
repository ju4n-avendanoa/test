import { Note } from "../interface/Note";

export default async function archiveTask(note: Note) {
  try {
    const SERVERURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${SERVERURL}/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ archived: !note.archived }),
    });

    if (!response.ok) {
      throw new Error("Error al editar la tarea");
    }
  } catch (error) {
    console.error("There was an error:", error);
    throw error;
  }
}
