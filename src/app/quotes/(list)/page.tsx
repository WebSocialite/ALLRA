'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'

export default function QuotesPage() {
  const quotes = useInfiniteQuotes()

  return (
    <>
      {quotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quote={quote.quote}
          author={quote.author}
          isFavorite={false}
          onFavorite={() => {
            console.log('Clicked on favorite')
          }}
        />
      ))}
    </>
  )
}
