import { useEffect, useState } from 'react'

export interface Product {
  id: number
  title: string
  thumbnail: string
  category: string
}

export function useRelatedProducts(category: string, currentProductId: number) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?category=${category}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }

        const data = await response.json()
        if (!data.products) {
          throw new Error('Invalid data structure: products missing')
        }

        const { products }: { products: Product[] } = data

        // Filter products by category and exclude the current product
        const filteredProducts = products.filter(
          (product) => product.category === category && product.id !== currentProductId
        )

        // Limit to 3 products for display
        setRelatedProducts(filteredProducts.slice(0, 3))
      } catch (err: any) {
        console.error('Error fetching related products:', err)
        setError(new Error(err.message || 'Failed to fetch related products'))
      } finally {
        setIsLoading(false)
      }
    }

    if (!category) {
      setIsLoading(false)
      setError(new Error('No category provided.'))
      return
    }

    fetchRelatedProducts()
  }, [category, currentProductId])

  return { relatedProducts, isLoading, error }
}
