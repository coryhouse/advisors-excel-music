import ky from "ky";
import { Song } from "../types/Song";
import { Deserializer, Serializer } from "jsonapi-serializer";
import { NewSong } from "../App";

export type SongResponse = {
  type: "songs";
  id: string;
  attributes: {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    artist: string;
    title: string;
    length: string;
  };
  relationships?: {
    album: {
      data: {
        type: "album";
        id: string;
      };
    };
    playlists?: {
      data: [
        {
          type: "playlists";
          id: string;
        }
      ];
    };
    likes?: {
      data: [
        {
          type: "likes";
          id: string;
        }
      ];
    };
  };
};

export type GetSongsResponse = {
  data: SongResponse[];
  included?: [
    {
      type: string;
      id: string;
      attributes: {
        createdBy: string;
        createdAt: string;
        updatedBy: string;
        updatedAt: string;
        name: string;
      };
      relationships: {
        songs: {
          data: [
            {
              type: string;
              id: string;
            }
          ];
        };
      };
    }
  ];
  links?: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
};

export type CreateSongResponse = {
  data: SongResponse;
};

export async function getSongs(): Promise<Song[]> {
  const resp = (await ky(import.meta.env.VITE_API_BASE_URL + "v1/songs", {
    headers: {
      accept: "application/vnd.api+json",
      prefer: "code=200, dynamic=true",
    },
  }).json()) as GetSongsResponse;

  const deserializer = new Deserializer({
    keyForAttribute: "camelCase",
  });
  const songs = await deserializer.deserialize(resp);
  return songs;
}

export async function createSong(newSong: NewSong): Promise<Song> {
  const serializer = new Serializer("songs", {
    keyForAttribute: "camelCase",
    attributes: Object.keys(newSong),
  });
  const json = serializer.serialize(newSong);

  const resp = (await ky
    .post(import.meta.env.VITE_API_BASE_URL + "v1/songs", {
      json,
      headers: {
        accept: "application/vnd.api+json",
        prefer: "code=201, dynamic=true",
      },
    })
    .json()) as CreateSongResponse;

  const deserializer = new Deserializer({
    keyForAttribute: "camelCase",
  });
  return deserializer.deserialize(resp);
}
