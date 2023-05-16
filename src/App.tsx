import { Box, Button, TextField } from "@mui/material";
import { SongMetadata } from "./SongMetadata";
import { Song } from "./types/Song";
import { useState } from "react";
import { FormField } from "./shared/FormField";

type NewSong = Omit<
  Song,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
>;

const newSong: NewSong = {
  artist: "",
  title: "",
  length: "",
};

type Errors = {
  artist?: string;
  title?: string;
  length?: string;
};

type Status = "idle" | "submitted";

export function App() {
  const [songs, setSongs] = useState(initialSongs);
  const [song, setSong] = useState(newSong);
  const [status, setStatus] = useState<Status>("idle");
  const [formKey, setFormKey] = useState(0);

  // Derived state
  const errors = validate();

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSong({ ...song, [e.target.id]: e.target.value });
  }

  function validate() {
    const errors: Errors = {};
    if (!song.title) errors.title = "Title is required";
    if (!song.artist) errors.artist = "Artist is required";
    if (!song.length) errors.length = "Length is required";
    return errors;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitted");
    if (Object.keys(errors).length > 0) return; // Don't submit if there are errors

    // Validate
    // "Disable" submit button
    // Notification
    // Save it somewhere
    setSongs([
      ...songs,
      {
        ...song,
        id: Math.random().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "admin@email.com",
        updatedBy: "admin@email.com",
      },
    ]);
    // Clear form
    setFormKey(formKey + 1);
    setSong(newSong);
    setStatus("idle");
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl">Songs</h1>

      <form key={formKey} onSubmit={onSubmit}>
        <h2>Add Song</h2>
        <FormField
          label="Title"
          id="title"
          value={song.title}
          onChange={onChange}
          error={errors.title}
          formSubmitted={status === "submitted"}
        />

        <FormField
          label="Artist"
          id="artist"
          value={song.artist}
          onChange={onChange}
          error={errors.artist}
          formSubmitted={status === "submitted"}
        />

        <FormField
          label="Length"
          id="length"
          value={song.length}
          onChange={onChange}
          error={errors.length}
          formSubmitted={status === "submitted"}
        />

        <Button type="submit" variant="contained">
          Add Song
        </Button>
      </form>

      <section className="flex flex-wrap mt-2">
        {songs.map((song) => {
          return (
            <section className="bg-cyan-600 block hover:bg-cyan-500 transition-colors hover:shadow-xl min-w-min text-white p-2 mr-2 mb-2 rounded shadow">
              <h2 className="font-bold">
                {song.title} - {song.artist}
              </h2>
              <p>{song.length}</p>

              <div>
                <SongMetadata
                  action="Created"
                  date={song.createdAt}
                  email={song.createdBy}
                />

                <SongMetadata
                  action="Updated"
                  date={song.updatedAt}
                  email={song.updatedBy}
                />
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
