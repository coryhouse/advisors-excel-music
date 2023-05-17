import { GetSongsResponse } from "../services/songService";

export const songs: GetSongsResponse = {
  data: [
    {
      type: "songs",
      id: "1",
      attributes: {
        createdBy: "admin@email.com",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        updatedBy: "admin@email.com",
        artist: "Pink Floyd",
        title: "Time",
        length: "6:53",
      },
    },
    {
      type: "songs",
      id: "2",
      attributes: {
        createdBy: "admin@email.com",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
        updatedBy: "admin@email.com",
        artist: "The Beatles",
        title: "Here Comes the Sun",
        length: "3:05",
      },
    },
  ],
};
