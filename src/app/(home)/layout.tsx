import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '올라 과제 전형 설명',
  description: '올라 과제 전형 설명',
}
export default function HomeLayout({ children }: PropsWithChildren) {
  return <main className={'container prose py-10'}>{children}</main>
}
