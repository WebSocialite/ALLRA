import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface QuoteCardProps {
  quote: string
  author: string
  isFavorite: boolean
  onFavorite: () => void
}

export function QuoteCard({
  className,
  quote,
  author,
  isFavorite,
  onFavorite,
  ...props
}: QuoteCardProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <main className={cn('relative p-5 border-b', className)} {...props}>
      <div className={'w-11/12'}>
        <p className={'text-xl italic text-primary'}>{quote}</p>
        <small className={'text-secondary'}>- {author}</small>
      </div>
      <Button
        className="absolute right-2 top-2"
        onClick={onFavorite}
        variant="ghost"
      >
        {isFavorite ? (
          <StarIcon fill={'#FFD700'} stroke={'#FFD700'} />
        ) : (
          <StarIcon fill={'transparent'} className={'text-gray-400'} />
        )}
      </Button>
    </main>
  )
}
