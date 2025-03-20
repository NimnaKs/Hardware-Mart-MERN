"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import type { CartItem as CartItemType } from "@/lib/types"

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center py-4 border-b">
      <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg?height=80&width=80"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="ml-4 w-20 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
      <Button variant="ghost" size="icon" className="ml-2" onClick={() => removeFromCart(item.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

