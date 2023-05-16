import ky from "ky";
import { Song } from "../types/Song";

export async function getSongs(): Promise<Song[]> {
  return ky("http://localhost:3000/v1/songs").json();
}
