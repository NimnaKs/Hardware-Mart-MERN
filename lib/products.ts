"use server";

import type { Product } from "./types";
import { v4 as uuidv4 } from "uuid";

// In a real application, this would be a database
let products: Product[] = [
  {
    id: "1",
    name: "Professional Hammer",
    description: "Heavy-duty hammer with ergonomic grip for professional use.",
    price: 29.99,
    category: "Hand Tools",
    stock: 50,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "Ergonomic rubber grip",
      "Steel head for durability",
      "Shock-absorbing design",
      "Perfect balance for reduced fatigue",
    ],
  },
  {
    id: "2",
    name: "Cordless Drill Set",
    description:
      "Powerful cordless drill with multiple attachments and carrying case.",
    price: 149.99,
    category: "Power Tools",
    stock: 25,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "20V lithium-ion battery",
      "Variable speed control",
      "LED work light",
      "Includes 10 drill bits",
    ],
  },
  {
    id: "3",
    name: "Precision Screwdriver Set",
    description:
      "Set of precision screwdrivers for electronics and small repairs.",
    price: 19.99,
    category: "Hand Tools",
    stock: 100,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "12 different sizes and types",
      "Magnetic tips for easy handling",
      "Rotating caps for precision control",
      "Compact storage case included",
    ],
  },
  {
    id: "4",
    name: "Heavy-Duty Extension Cord",
    description: "Weather-resistant extension cord for outdoor use.",
    price: 34.99,
    category: "Electrical",
    stock: 40,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "50 feet length",
      "All-weather resistant",
      "Lighted end for visibility",
      "UL certified for safety",
    ],
  },
  {
    id: "5",
    name: "Adjustable Wrench Set",
    description: "Set of 3 adjustable wrenches in different sizes.",
    price: 45.99,
    category: "Hand Tools",
    stock: 30,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "Chrome vanadium steel construction",
      "Precise jaw adjustment",
      "Comfortable grip handles",
      'Sizes: 6", 8", and 10"',
    ],
  },
  {
    id: "6",
    name: "Premium Paint Roller Kit",
    description: "Complete paint roller kit for professional-quality results.",
    price: 24.99,
    category: "Paint",
    stock: 60,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "Lint-free rollers for smooth application",
      "Extendable handle up to 6 feet",
      "Paint tray with pour spout",
      "Edge roller for precise corners",
    ],
  },
  {
    id: "7",
    name: "Pipe Wrench",
    description: "Heavy-duty pipe wrench for plumbing repairs.",
    price: 18.99,
    category: "Plumbing",
    stock: 45,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "Cast iron construction",
      "Self-cleaning threads",
      "Non-slip grip",
      'Available in 10" and 14" sizes',
    ],
  },
  {
    id: "8",
    name: "Assorted Fasteners Kit",
    description:
      "Comprehensive set of screws, nails, and anchors for various projects.",
    price: 39.99,
    category: "Fasteners",
    stock: 75,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "Over 1000 pieces",
      "Organized storage case",
      "Includes common sizes and types",
      "Perfect for home repairs and projects",
    ],
  },
];

export async function getAllProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products.slice(0, 4);
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products.find((product) => product.id === id) || null;
}

export async function createProduct(
  productData: Omit<Product, "id">
): Promise<Product> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newProduct: Product = {
    id: uuidv4(),
    ...productData,
  };

  products.push(newProduct);
  return newProduct;
}

export async function updateProduct(
  id: string,
  productData: Partial<Product>
): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...productData };
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const initialLength = products.length;
  products = products.filter((product) => product.id !== id);
  return products.length < initialLength;
}
