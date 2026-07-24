'use client';

interface PlayerProps {
  title: string | null;
  artist: string | null;
  isPlaying: boolean;
}

export default function Player({ title, artist, isPlaying }: PlayerProps) {
  return (
    <div>
      {isPlaying ? (
        <p>{title} - {artist}</p>
      ) : <p>No track is currently playing.</p>}
    </div>
  );
}