import { CreateNote } from "./CreateNote";
import Link from "next/link";
import styles from "./page.module.css";
type Note = {
  name: string;
  text: string;
  id: string;
};
async function getData() {
  const data = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records",
    { cache: "no-store" }
  );
  const jsonData = await data.json();
  return jsonData.items as Note[];
}

export default async function NotesPage() {
  const notes = await getData();
  return (
    <main>
      <article className={styles.notesContainer}>
        {notes
          ? notes.map((note) => <Note {...note} key={note.id} />)
          : "loading"}
      </article>
      <CreateNote />
    </main>
  );
}
type NoteProps = Omit<Note, "key">;
function Note({ name, text, id }: NoteProps) {
  return (
    <article className={styles.note}>
      <Link href={`notes/${id}`}>
        <h2>{name}</h2>
        <p>{text.length > 15 ? text.slice(0, 15) + "..." : text}</p>
      </Link>
    </article>
  );
}
