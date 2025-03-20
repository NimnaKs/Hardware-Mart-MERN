import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";
import type { Product } from "../types";

export async function getAllProducts(): Promise<Product[]> {
  const client = await clientPromise;
  const collection = client.db().collection("products");

  const products = await collection.find({}).toArray();

  return products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    image: product.image,
    features: product.features,
  }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const client = await clientPromise;
  const collection = client.db().collection("products");

  const products = await collection.find({}).limit(4).toArray();

  return products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    image: product.image,
    features: product.features,
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const client = await clientPromise;
    const collection = client.db().collection("products");

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) return null;

    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      features: product.features,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function createProduct(
  productData: Omit<Product, "id">
): Promise<Product> {
  const client = await clientPromise;
  const collection = client.db().collection("products");

  const result = await collection.insertOne(productData);

  return {
    id: result.insertedId.toString(),
    ...productData,
  };
}

export async function updateProduct(
  id: string,
  productData: Partial<Product>
): Promise<Product | null> {
  const client = await clientPromise;
  const collection = client.db().collection("products");

  const { id: _, ...updateData } = productData;

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  const updatedProduct = await collection.findOne({ _id: new ObjectId(id) });

  if (!updatedProduct) return null;

  return {
    id: updatedProduct._id.toString(),
    name: updatedProduct.name,
    description: updatedProduct.description,
    price: updatedProduct.price,
    category: updatedProduct.category,
    stock: updatedProduct.stock,
    image: updatedProduct.image,
    features: updatedProduct.features,
  };
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const collection = client.db().collection("products");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount === 1;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}

// Seed initial products if the collection is empty
export async function seedProducts() {
  const client = await clientPromise;
  const collection = client.db().collection("products");

  const count = await collection.countDocuments();

  if (count === 0) {
    const initialProducts = [
      {
        name: "Professional Hammer",
        description:
          "Heavy-duty hammer with ergonomic grip for professional use.",
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
        sku: "PH12345",
      },
      {
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
        name: "Premium Paint Roller Kit",
        description:
          "Complete paint roller kit for professional-quality results.",
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

    await collection.insertMany(initialProducts);
    console.log("Seeded initial products");
  }
}
