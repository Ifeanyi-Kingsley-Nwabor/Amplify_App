import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { listNotes } from "../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";

const initialFormState = { name: "", description: "" };

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  const what = "Note";
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h1>Hello {user.username}</h1>
            <h3>Welcome to the Dash board</h3>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
      <div>
        <h1>My {what} App</h1>
        <input type="file" onChange={onChange} />
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Note Name"
          value={formData.name}
        />
        <input
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Note Description"
          value={formData.description}
        />
        <button onClick={createNote}>New Note</button>
        <div style={{ marginBottom: 30 }}>
          {notes.map((note) => (
            <div key={note.id || note.name}>
              {note.image && (
                <img
                  src={note.image}
                  style={{ width: 400 }}
                  alt="this is a representation of the subject note."
                />
              )}
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete Note</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
