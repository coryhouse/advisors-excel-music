type SongMetadataProps = {
  email: string;
  date: string;
  action: "Created" | "Updated";
};

export function SongMetadata({ email, date, action }: SongMetadataProps) {
  return (
    <p className="text-xs text-slate-200">
      {action} {date} by{" "}
      <a className="hover:underline" href={`mailto: ${email}`}>
        {email}
      </a>
    </p>
  );
}
