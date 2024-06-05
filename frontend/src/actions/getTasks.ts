export async function getTasks() {
  try {
    const SERVERURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${SERVERURL}/notes`);
    const notes = await response.json();
    return notes;
  } catch (error) {
    console.error("There was an error:", error);
    throw error;
  }
}
