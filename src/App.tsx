import { Button, CircularProgress } from "@mui/material";
import { SongMetadata } from "./SongMetadata";
import { Song } from "./types/Song";
import { useState } from "react";
import { FormField } from "./shared/FormField";
import { createSong, getSongs } from "./services/songService";
import { useQuery, useMutation } from "@tanstack/react-query";

export type NewSong = Omit<
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
  const [song, setSong] = useState(newSong);
  const [status, setStatus] = useState<Status>("idle");
  const [formKey, setFormKey] = useState(0);

  // Derived state
  const errors = validate();

  const {
    data: songs = [],
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  const songMutation = useMutation({
    mutationFn: (song: NewSong) => createSong(song),
    onSuccess: () => {
      setFormKey(formKey + 1);
      setSong(newSong);
      setStatus("idle");
    },
  });

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
    songMutation.mutate(song);
    // setSongs([
    //   ...songs,
    //   {
    //     ...song,
    //     id: Math.random().toString(),
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     createdBy: "admin@email.com",
    //     updatedBy: "admin@email.com",
    //   },
    // ]);
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl">Songs</h1>
      {isRefetching && <p>Refetching...</p>}

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

      {isLoading ? (
        <CircularProgress />
      ) : (
        <section className="flex flex-wrap mt-2">
          {songs.map((song) => {
            return (
              <section
                key={song.id}
                className="block p-2 mb-2 mr-2 text-white transition-colors rounded shadow bg-cyan-600 hover:bg-cyan-500 hover:shadow-xl min-w-min"
              >
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
      )}
    </div>
  );
}
