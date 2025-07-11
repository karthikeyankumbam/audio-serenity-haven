import { useState } from "react";
import { BookCard } from "./BookCard";
import { Audiobook } from "@/types/audiobook";

interface FeaturedSectionProps {
  title: string;
  books: Audiobook[];
  onPlayBook: (book: Audiobook) => void;
  onToggleWishlist: (bookId: string) => void;
}

export function FeaturedSection({ title, books, onPlayBook, onToggleWishlist }: FeaturedSectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              variant="grid"
              onPlay={onPlayBook}
              onWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}