"use client";

import { Song } from "../types/song";


interface SongCardProps { 
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: (videoId: string) => void;
}

export function SongCard({ song, isFavorite, onToggleFavorite }: SongCardProps) { 
  return (
    <div>
      <img src={song.thumbnailUrl} alt={song.title} />
      <h3>{song.title}</h3>
      <p>{song.channelTitle}</p>
      <button onClick={() => onToggleFavorite(song.videoId)}>
        {isFavorite ? "❌ Remove" : "💜 Favorite"}
      </button>
    </div>
  )
}