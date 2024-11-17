'use client';

import { useState, useEffect } from 'react';
import { Quote } from './use-infinite-quotes';


export const handleFavoriteToggle = (quote: Quote) => {
  const storedFavorites: Quote[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  const updatedFavorites = [...storedFavorites];

  const isAlreadyFavorite = storedFavorites.some((fav) => fav.id === quote.id);

  if (isAlreadyFavorite) {
    const index = updatedFavorites.findIndex((fav) => fav.id === quote.id);
    updatedFavorites.splice(index, 1);
  } else {
    updatedFavorites.push(quote);
  }

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export function useFavoriteQuotes(): Quote[] {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    // Retrieve and parse favorites from localStorage
    const storedFavorites: Quote[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  return favorites;
}

