async function getNote(noteId: string) {
  const data = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`
  );
  const jsonData = await data.json();

  return jsonData;
}
type Params = {
  params: {
    id: string;
  };
};
export default async function NotePage({ params: { id } }: Params) {
  const { name: title, text: noteText } = await getNote(id);

  return (
    <main>
      <h1>{title}</h1>
      <p>{noteText}</p>
    </main>
  );
}
