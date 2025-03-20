import { type NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/models/product";

export async function GET(request: NextRequest) {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
