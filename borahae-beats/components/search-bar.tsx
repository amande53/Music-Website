"use client";

import { useState } from "react";

export default function SearchBar({
  searchQuery, setSearchQuery
}: {
  searchQuery: string, setSearchQuery: (query: string) => void
}) {
 const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section className="search-section">
  <form
    className="search"
  >
    <input
      type="text"
      className="search__input"
      placeholder="Search artists, songs, or albums..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
        <button
        className="clear__button"
        type="button"
        onClick={() => setSearchQuery("")}
      >
        Clear
      </button>
    <button
      className="search__button"
          type="submit"
          disabled={isSubmitting}
          onClick={() => setIsSubmitting(true)}
    >
      Search
    </button>
  </form>

  <select
    id="sort-select"
    className="sort-select"
  >
    <option value="default">Sort</option>

    <option value="a-z">A → Z</option>

    <option value="z-a">Z → A</option>
  </select>
    </section>
  );
};