"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/types"
import { ShoppingCart } from "lucide-react"

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })
  }

  return (
    <Button onClick={handleAddToCart} disabled={product.stock <= 0} className="flex items-center gap-2">
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </Button>
  )
}

