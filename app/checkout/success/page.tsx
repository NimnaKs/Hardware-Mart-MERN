import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>
        <div className="bg-card p-6 rounded-lg shadow mb-6">
          <h2 className="font-bold mb-2">Order #12345</h2>
          <p className="text-sm text-muted-foreground mb-4">March 20, 2025</p>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span className="font-bold">$123.45</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery</span>
            <span>March 25-27, 2025</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
          <Link href="/account/orders">
            <Button variant="outline">View Order</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

