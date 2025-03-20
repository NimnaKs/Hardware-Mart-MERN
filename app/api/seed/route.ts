import { NextResponse } from "next/server"
import { seedProducts } from "@/lib/models/product"
import { seedUsers } from "@/lib/models/user"

export async function GET() {
  try {
    await seedProducts()
    await seedUsers()

    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Seeding error:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

