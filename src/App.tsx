type Song = {
  createdBy: string;
  createAt: string;
  updatedBy: string;
  updatedAt: string;
  artist: string;
  title: string;
  length: string;
};

const songs: Song[] = [
  {
    createdBy: "admin@email.com",
    createAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "Pink Floyd",
    title: "Time",
    length: "6:53",
  },
  {
    createdBy: "admin@email.com",
    createAt: "2021-01-01",
    updatedAt: "2021-01-01",
    updatedBy: "admin@email.com",
    artist: "The Beatles",
    title: "Here Comes the Sun",
    length: "3:05",
  },
];

export function App() {
  return (
    <>
      <h1>Songs</h1>
      {songs.map((song) => {
        return song.artist;
      })}
    </>
  );
}
