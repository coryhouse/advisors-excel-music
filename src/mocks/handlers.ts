import { rest } from "msw";
import { songs } from "./songs";
import { NewSong } from "../App";
import { CreateSongResponse, SongResponse } from "../services/songService";

export const handlers = [
  rest.get("/v1/songs", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(songs), ctx.delay(0));
  }),

  rest.post("/v1/songs", async (req, res, ctx) => {
    const newSong = (await req.json()) as CreateSongResponse;

    const song: SongResponse = {
      type: "songs",
      id: (songs.data.length + 1).toString(),
      attributes: {
        ...newSong.data.attributes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "Bob",
        updatedBy: "Bob",
      },
    };

    // HACK: Add song to in-memory database
    songs.data.push(song);
    return res(ctx.status(201), ctx.json(song), ctx.delay(0));
  }),
];
