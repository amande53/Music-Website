import FavoritesSection from "@/components/favorites-section";
import FloatingIcons from "@/components/floating-icons";
import Hero from "@/components/hero";
import SongsGrid from "@/components/songs-grid";


export default function Home() {
  return (
    <main>
      <Hero />
      <SongsGrid
        songs={[]}
        isLoading={false}
        searchText=""
        showAll={false}
      />
      <FavoritesSection favorites={[]} onToggleFavorite={() => { }} />
      <FloatingIcons />
    </main>
  );
}
