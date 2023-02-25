"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export function CreateNote() {
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const router = useRouter();
  async function updateNotes(title: string, noteText: string) {
    await fetch("http://127.0.0.1:8090/api/collections/notes/records/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        text: noteText,
        password: "8765432133",
        passwordConfirm: "8765432133",
      }),
    });
    router.refresh();
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateNotes(title, noteText);
      }}
    >
      <h3>create new note</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name={"title"}
      />
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        name={"noteText"}
      />
      <button type="submit">submit new note </button>
    </form>
  );
}
