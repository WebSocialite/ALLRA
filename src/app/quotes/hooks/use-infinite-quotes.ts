import { useState, useEffect, useRef } from 'react';

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

// Cache variables to persist data across navigation
let cachedQuotes: Quote[] = [];
let cachedPage = 0;
let cachedHasMore = true;

export const useInfiniteQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>(cachedQuotes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(cachedHasMore);
  const [page, setPage] = useState(cachedPage); // Track the current page for fetching
  const observer = useRef<IntersectionObserver | null>(null); // Observer for infinite scrolling
  const lastQuoteRef = useRef<HTMLDivElement | null>(null); // Reference to the last quote for observation

  // Fetch quotes from the API
  const fetchQuotes = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/quotes?limit=12&skip=${page * 10}`);
      const data = await response.json();

      if (data.quotes.length > 0) {
        cachedQuotes = [...cachedQuotes, ...data.quotes]; // Update cached quotes
        setQuotes(cachedQuotes);
      }

      if (data.quotes.length < 10) {
        cachedHasMore = false; // No more quotes to fetch
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Infinite scrolling logic using IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0, // Trigger when the element is fully in view
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (lastQuoteRef.current) {
      observer.current.observe(lastQuoteRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, isLoading]);

  // Fetch quotes whenever the page changes
  useEffect(() => {
    if (page === 0 || !hasMore) return;

    cachedPage = page; // Update cached page
    fetchQuotes(page);
  }, [page]);

  // Initial fetch on first load
  useEffect(() => {
    if (cachedQuotes.length === 0) {
      fetchQuotes(0);
    }
  }, []);

  return { quotes, isLoading, hasMore, lastQuoteRef };
};
