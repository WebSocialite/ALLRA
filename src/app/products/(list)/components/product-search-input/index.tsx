import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useProductsSearchParams } from '@/app/products/(list)/hooks/use-products-search-params'

// TODO: 현재 검색창이 제대로 동작하지 않습니다. 수정해주세요.

export function ProductSearchInput({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { term, handleTermChange } = useProductsSearchParams()

  return (
    <main className={cn('relative', className)} {...props}>
      <Input
        value={term}
        onChange={async (e) => {
          await handleTermChange(e.target.value)
        }}
        className={'h-12 pl-12 text-base'}
        placeholder={'Search product'}
      />
      <SearchIcon className={'absolute left-3 top-1/2 -translate-y-1/2'} />
    </main>
  )
}
