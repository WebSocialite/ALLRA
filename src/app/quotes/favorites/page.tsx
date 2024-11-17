'use client';

import { useEffect, useState } from 'react';
import { QuoteCard } from '@/app/quotes/components/quote-card';
import { Quote, useInfiniteQuotes } from '../hooks/use-infinite-quotes';
import { handleFavoriteToggle } from '../hooks/use-favorite-quotes';

export default function FavoriteQuotesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const { quotes, isLoading, hasMore, lastQuoteRef } = useInfiniteQuotes()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      setFavorites(storedFavorites)
    }
  }, [])

  const isFavorite = (quoteId: number) => {
    return favorites.some((fav) => fav.id === quoteId);
  };

  const handleFavorite = (quote: Quote) => {
    handleFavoriteToggle(quote);

    // Update the favorites state after toggling
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === quote.id);

      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== quote.id);
      } else {
        return [...prevFavorites, quote];
      }
    });
  };

  //  ensuring uniqueness
  const combinedQuotes = [...favorites].filter(
    (quote, index, self) => self.findIndex((q) => q.id === quote.id) === index
  );

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold italic text-secondary-foreground">
        My Favorites
      </h1>
  {quotes.length === 0 ? (
    <p className="text-gray-500">No favorites added yet.</p>
  ) : (
   combinedQuotes.map((quote) => (
   
       <QuoteCard
          key={quote.id}
          quote={quote.quote}
          author={quote.author}
          isFavorite={isFavorite(quote.id)}
          onFavorite={() => handleFavorite(quote)} 
        />

    ))
  )}



    </div>
  );
}
