import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { Markazi_Text } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '올라 위즈덤',
  description: '올라 과제 전형 - 위즈덤',
}

const markaziText = Markazi_Text({
  subsets: ['latin'],
  weight: '700',
})

export default function QuotesLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header
        className={'container fixed top-0 z-50 bg-background py-10 pr-10'}
      >
        <section className={'flex items-center justify-between'}>
          <Link href={'/quotes'} className={'inline-flex items-center gap-2'}>
            <Image
              src={'/quotes-logo.svg'}
              alt={'logo'}
              width={80}
              height={80}
            />
            <h2
              className={cn(
                markaziText.className,
                'text-2xl lg:text-4xl font-bold'
              )}
            >
              Allra Wisdom
            </h2>
          </Link>
          <Link
            className={'font-semibold italic underline'}
            href={'/quotes/favorites'}
          >
            My Favorite
          </Link>
        </section>
      </header>
      <main className={'mt-32'}>{children}</main>
    </div>
  )
}
