'use client'

import { useState, useEffect } from 'react'
import { Quote, useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { handleFavoriteToggle } from '../hooks/use-favorite-quotes'



export default function QuotesPage() {
  const { quotes, isLoading, hasMore, lastQuoteRef  } = useInfiniteQuotes();
  const [favorites, setFavorites] = useState<Quote[]>([]);

  // Check localStorage for favorites when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites: Quote[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    }
  }, []);

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

  return (
    <div>
    
      {quotes.map((quote, index) => (
        <div
        key={index}
        ref={index === quotes.length - 1 ? lastQuoteRef : null} 
      >
        <QuoteCard
        
          key={quote.id}
          quote={quote.quote}
          author={quote.author}
          isFavorite={isFavorite(quote.id)}
          onFavorite={() => handleFavorite(quote)} 
        />
        </div>
      ))}
      {isLoading && <p>Loading more quotes...</p>}
      {!hasMore && <p>No more quotes to display.</p>}
    </div>
  );
}
