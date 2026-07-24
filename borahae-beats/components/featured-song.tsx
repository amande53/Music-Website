"use client";

import { useState } from "react";
import { SongCard } from "./song-card";
import { Song } from "@/types/song";

export default function FeaturedSong({
  song,
}: {
  song: Song;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div>
      <SongCard
        song={song}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
      />
    </div>
  );
}
