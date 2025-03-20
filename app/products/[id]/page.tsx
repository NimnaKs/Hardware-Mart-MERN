import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg?height=500&width=500"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.category}</p>
          <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>

          <p className="mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Availability</h3>
            <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </p>
          </div>

          <div className="flex gap-4">
            <AddToCartButton product={product} />
            <Button variant="outline">Add to Wishlist</Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="bg-card p-6 rounded-lg">
          <p className="mb-4">{product.description}</p>
          <ul className="list-disc pl-5 space-y-2">
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

