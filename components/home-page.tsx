"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Truck,
  CreditCard,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Product } from "@/lib/types";

interface HomePageProps {
  products: Product[];
}

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80",
    title: "Quality Tools for Every Project",
    description:
      "Professional grade hardware and tools for contractors and DIY enthusiasts",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80",
    title: "Professional Power Tools",
    description: "High-performance tools for demanding jobs",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80",
    title: "Hand Tools Collection",
    description: "Premium quality hand tools for precision work",
  },
];

export function HomePage({ products }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
                  {slide.title}
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                {...{
                  className: "text-xl md:text-2xl mb-8 text-center max-w-3xl",
                }}
              >
                {slide.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                {...{ className: "flex flex-col sm:flex-row gap-4" }}
              >
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
              </motion.div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Shop by Category - Modern Design */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Hand Tools",
                image:
                  "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80",
                link: "/products?category=Hand+Tools",
                description: "Professional-grade hand tools for precision work",
              },
              {
                name: "Power Tools",
                image:
                  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80",
                link: "/products?category=Power+Tools",
                description: "High-performance power tools for any job",
              },
              {
                name: "Fasteners",
                image:
                  "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&q=80",
                link: "/products?category=Fasteners",
                description: "Quality fasteners for secure connections",
              },
              {
                name: "Electrical",
                image:
                  "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80",
                link: "/products?category=Electrical",
                description: "Complete electrical solutions and supplies",
              },
              {
                name: "Plumbing",
                image:
                  "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80",
                link: "/products?category=Plumbing",
                description: "Professional plumbing tools and materials",
              },
              {
                name: "Paint",
                image:
                  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80",
                link: "/products?category=Paint",
                description: "Premium paints and finishing supplies",
              },
            ].map((category, index) => (
              <Link key={index} href={category.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  {...{
                    className:
                      "group relative h-[400px] overflow-hidden rounded-2xl",
                  }}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/80 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-sm font-semibold">
                        <span>Shop Now</span>
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>
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
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banners */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Power Tools Banner */}
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80"
                alt="Power tools special offer"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-8">
                <h3 className="text-white text-3xl font-bold mb-4">
                  15% OFF Power Tools
                </h3>
                <p className="text-white/90 mb-6">
                  Professional grade power tools for every job
                </p>
                <Link href="/products?category=Power+Tools">
                  <Button variant="secondary" size="lg">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hand Tools Banner */}
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80"
                alt="Hand tools special offer"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-8">
                <h3 className="text-white text-3xl font-bold mb-4">
                  Buy 2 Get 1 Free
                </h3>
                <p className="text-white/90 mb-6">
                  On selected hand tools and accessories
                </p>
                <Link href="/products?category=Hand+Tools">
                  <Button variant="secondary" size="lg">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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
