import { rest } from "msw";
import { songs } from "./songs";
import { CreateSongResponse } from "../services/songService";

export const handlers = [
  rest.get("/v1/songs", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(songs), ctx.delay(0));
  }),

  rest.post("/v1/songs", async (req, res, ctx) => {
    const newSong = (await req.json()) as CreateSongResponse;
    newSong.data.id = (songs.data.length + 1).toString();
    newSong.data.attributes.createdAt = new Date().toISOString();
    newSong.data.attributes.updatedAt = new Date().toISOString();
    newSong.data.attributes.createdBy = "admin";
    newSong.data.attributes.updatedBy = "admin";

    // HACK: Add song to in-memory database
    songs.data.push(newSong.data);
    return res(ctx.status(201), ctx.json(newSong), ctx.delay(0));
  }),
];
