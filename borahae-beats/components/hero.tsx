import FeaturedSong from "@/components/featured-song";
import Link from "next/link";


export default async function Hero() {

  const key = process.env.YOUTUBE_API_KEY;
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&q=BTS`);

  const data = await response.json();
  const featuredSong = data.items[0];

  return (
    <div>
      <div>
        <p className="eyebrow">Music Discovery App</p>
        <h2 className="hero_title">Find your next favorite song.</h2>
        <p className="hero_description">
          Search tracks, preview songs, and save your favorite finds with Borahae Beats.
        </p>
        
          <Link className="hero_button" href="/search">Start Searching →</Link>
        
        <div className="chips">
          <Link href="/search?q=K-pop">K-pop</Link>
          <Link href="/search?q=Pop">Pop</Link>
          <Link href="/search?q=Hip-hop">Hip-hop</Link>
          <Link href="/search?q=Lofi">Lofi</Link>
          <Link href="/search?q=Jazz">Jazz</Link>
          <Link href="/search?q=Rock">Rock</Link>
        </div>
      </div>
      <div>
        <h3 className="hero__featured">Featured Song</h3>
        <div className="hero__featured-song">
          <FeaturedSong
            song={{
              videoId: featuredSong.id.videoId,
              title: featuredSong.snippet.title,
              channelTitle: featuredSong.snippet.channelTitle,
              thumbnailUrl: featuredSong.snippet.thumbnails.medium.url,
            }}
          />
        </div>
      </div>
    </div>
  );
}