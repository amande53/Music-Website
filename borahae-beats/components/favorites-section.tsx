import { SongCard } from "@/components/song-card";
import { Song } from "@/types/song";

export interface FavoritesSectionProps {
  favorites: Song[];
  onToggleFavorite: (videoId: string) => void;
}

export default function FavoritesSection({ favorites, onToggleFavorite }: FavoritesSectionProps) {
  return (
    <div>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <>
          {favorites.map((song) => (
            <SongCard 
              key={song.videoId} 
              song={song} 
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </>
      )}
    </div>
  );
}