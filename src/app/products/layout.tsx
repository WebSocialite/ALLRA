import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Rubik_Moonrocks } from 'next/font/google'
import { PropsWithChildren, Suspense } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '올라 마켓',
  description: '올라 과제 전형 - 마켓',
}
const rubikMoonrocks = Rubik_Moonrocks({
  weight: '400',
  subsets: ['latin'],
})
export default function ProductLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <Link href={'/products'} className={'my-10 flex items-center gap-2'}>
          <Image src={'/logo.svg'} alt={'marget'} width={50} height={50} />
          <h1
            className={cn(
              rubikMoonrocks.className,
              'text-4xl text-green-500 font-bold'
            )}
          >
            Allra Market
          </h1>
        </Link>
      </header>
      <Suspense>
        <main className={'container pb-20'}>{children}</main>
      </Suspense>
    </>
  )
}
