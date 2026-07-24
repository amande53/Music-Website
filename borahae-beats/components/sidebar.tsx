import { FaMusic } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar({
  favoriteCount
}: {
  favoriteCount?: number;
}) {
  return (
    <div className="sidebar">
      <img src='/assets/logo-wordmark.png' alt='Borahae Beats Logo'  />
      <div>
        <FaMusic  />
        <Link href="/" >Home</Link>
        <Link href="/search" >Search</Link>
        <Link href="/favorites" id="favorites-link">Favorites ({favoriteCount ?? 0})</Link>
        <FaMusic  />

      </div>
    </div>
  );
}