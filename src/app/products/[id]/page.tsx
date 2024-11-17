'use client'

import { use } from 'react'
import { CircularProgress, Box, Typography, List, ListItemText, ListItem } from '@mui/material'
import { useProduct } from '@/app/products/[id]/hooks/use-product'
import { useRelatedProducts } from '@/app/products/[id]/hooks/use-related-products'
import { useRouter } from 'next/navigation'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)
  const { data, isLoading, error } = useProduct(id)
  const router = useRouter();

  // Use related products hook
  const { relatedProducts, isLoading: isRelatedLoading, error: relatedError } = useRelatedProducts(
    data?.category || '',
    parseInt(id, 10)
  )

  if (isLoading) {
    return <CircularProgress />;
  }
  
  if (error && !relatedProducts.length) {
    return (
      <Typography color="error" style={{ marginTop: '16px' }}>
        Failed to fetch related products
      </Typography>
    );
  }
  
  if (!relatedProducts.length) {
    return (
      <Typography style={{ marginTop: '16px' }}>
        No related products available.
      </Typography>
    );
  }
  

  if (!data) {
    return (
      <Box textAlign="center" marginTop={8} color="textSecondary">
        <Typography variant="body1">No product found.</Typography>
      </Box>
    )
  }

  return (
    <Box maxWidth="lg" mx="auto" p={4}>
      {/* Product Image and Details Section */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} bgcolor="background.paper" boxShadow={3} borderRadius={2} overflow="hidden">
        {/* Product Image */}
        <Box width={{ md: '50%' }} p={3}>
          <img
            src={data.thumbnail || '/placeholder.png'}
            alt={data.title}
            style={{ width: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        </Box>

        <Box width={{ md: '50%' }} p={3} display="flex" flexDirection="column" justifyContent="space-between">
          <Typography variant="h4" component="h1" color="textPrimary" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {data.description}
          </Typography>
          <Typography variant="h5" component="p" color="success.main" fontWeight="bold">
            ${data.price}
          </Typography>

          <Box mt={2} color="textSecondary">
            <Typography>
              <strong>Category:</strong> {data.category}
            </Typography>
            <Typography>
              <strong>Rating:</strong> {data.rating} / 5
            </Typography>
            <Typography>
              <strong>Stock:</strong> {data.stock} units available
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Related Products Section */}
      <Box mt={4} p={3} bgcolor="grey.100" borderRadius={2}>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          함께 비교하면 좋을 상품
        </Typography>

        {isRelatedLoading && <CircularProgress />}

        {relatedError && (
          <Typography color="error.main">
            Failed to fetch related products: {relatedError.message}
          </Typography>
        )}

        {!isRelatedLoading && !relatedError && relatedProducts.length === 0 && (
          <Typography color="textSecondary">No related products available.</Typography>
        )}

<List>
  {relatedProducts.map((product) => (
    <ListItem
    key={product.id}
    component="li"
    
    onClick={() => router.push(`/products/${product.id}`)} // Fix navigation
  >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: 50, height: 50, marginRight: 16, borderRadius: 4, cursor: 'pointer'}}
      />
      <ListItemText primary={product.title}
      style={{ cursor: 'pointer' }} />
      
    </ListItem>
  ))}
</List>

      </Box>
    </Box>
  )
}
