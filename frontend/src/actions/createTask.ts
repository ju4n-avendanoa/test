export default async function createTask(
  description: string,
  newCategories: string[]
) {
  try {
    const SERVERURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${SERVERURL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, categories: newCategories }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }

    const note = await response.json();
    return note;
  } catch (error) {
    console.error("There was an error:", error);
    throw error;
  }
}
