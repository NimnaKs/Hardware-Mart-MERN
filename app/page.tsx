import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/models/product";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Truck,
  CreditCard,
  Clock,
} from "lucide-react";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Hardware tools on workbench"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Quality Tools for Every Project
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl">
            Professional grade hardware and tools for contractors and DIY
            enthusiasts
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="text-lg px-8">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Hand Tools",
                image: "/placeholder.svg?height=300&width=300",
                link: "/products?category=Hand+Tools",
              },
              {
                name: "Power Tools",
                image: "/placeholder.svg?height=300&width=300",
                link: "/products?category=Power+Tools",
              },
              {
                name: "Electrical",
                image: "/placeholder.svg?height=300&width=300",
                link: "/products?category=Electrical",
              },
              {
                name: "Plumbing",
                image: "/placeholder.svg?height=300&width=300",
                link: "/products?category=Plumbing",
              },
            ].map((category, index) => (
              <Link key={index} href={category.link} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105">
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center">
                      Shop Now <ArrowRight className="h-4 w-4 ml-1" />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              href="/products"
              className="text-primary hover:underline font-medium flex items-center"
            >
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
          <p className="text-xl mb-6">
            Get 15% off on all power tools this week!
          </p>
          <Link href="/products?category=Power+Tools">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Shop the Sale
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Why Choose Hardware Mart
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                All our products are carefully selected for durability and
                performance
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <Truck className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50 with delivery within 2-3
                business days
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <CreditCard className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                Multiple payment options with secure checkout process
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">30-Day Returns</h3>
              <p className="text-muted-foreground">
                Not satisfied? Return any product within 30 days for a full
                refund
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Johnson",
                role: "Professional Contractor",
                quote:
                  "Hardware Mart has been my go-to supplier for years. Their tools are reliable and the customer service is exceptional.",
              },
              {
                name: "Sarah Williams",
                role: "DIY Enthusiast",
                quote:
                  "As someone who loves home improvement projects, I appreciate the quality and variety of products available at Hardware Mart.",
              },
              {
                name: "David Thompson",
                role: "Construction Manager",
                quote:
                  "We've equipped our entire team with tools from Hardware Mart. The durability and performance have exceeded our expectations.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest products, promotions, and
            DIY tips
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="sm:w-auto">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
