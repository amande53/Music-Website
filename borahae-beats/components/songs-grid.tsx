"use client";
import { SongCard } from "@/components/song-card";
import { FaMusic } from "react-icons/fa";

import { Song } from "../types/song";
import { useState } from "react";

interface SongsGridProps {
  songs: Song[];
  isLoading: boolean;
  searchText: string;
  showAll: boolean;
}

export  default function SongsGrid({ songs, isLoading, searchText, showAll }: SongsGridProps) {
  const [showAllSongs, setShowAllSongs] = useState(false);
  const displayedSongs = showAllSongs ? songs : songs.slice(0, 10);

  if (isLoading ) {
    return <FaMusic />;
  }

  if (songs.length === 0) {
    return <p>No songs found for "{searchText}".</p>;
  }


  return (
    <div>
      {displayedSongs.map((song) => (
        <SongCard
          key={song.videoId}
          song={song}
          isFavorite={false}
          onToggleFavorite={() =>{}}
        />
      ))}
      {songs.length > 10 &&  (
        <button onClick={() => setShowAllSongs(!showAllSongs)}>
          {showAllSongs ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
}
