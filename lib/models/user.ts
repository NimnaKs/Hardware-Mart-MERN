import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"
import type { User } from "../types"
import bcrypt from "bcrypt"

export async function getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
  const client = await clientPromise
  const collection = client.db().collection("users")

  const user = await collection.findOne({ email })

  if (!user) return null

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    password: user.password,
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const client = await clientPromise
    const collection = client.db().collection("users")

    const user = await collection.findOne({ _id: new ObjectId(id) })

    if (!user) return null

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export async function createUser(userData: {
  name: string
  email: string
  password: string
  role?: "admin" | "customer"
}): Promise<User | null> {
  try {
    const client = await clientPromise
    const collection = client.db().collection("users")

    // Check if user already exists
    const existingUser = await collection.findOne({ email: userData.email })
    if (existingUser) {
      return null
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const result = await collection.insertOne({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "customer",
      createdAt: new Date(),
    })

    return {
      id: result.insertedId.toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role || "customer",
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function verifyPassword(user: { password: string }, inputPassword: string): Promise<boolean> {
  return bcrypt.compare(inputPassword, user.password)
}

// Seed initial admin user if no users exist
export async function seedUsers() {
  const client = await clientPromise
  const collection = client.db().collection("users")

  const count = await collection.countDocuments()

  if (count === 0) {
    // Create admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("admin123", salt)

    await collection.insertOne({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    })

    // Create a test customer user
    const customerSalt = await bcrypt.genSalt(10)
    const customerHashedPassword = await bcrypt.hash("password123", customerSalt)

    await collection.insertOne({
      name: "John Doe",
      email: "john@example.com",
      password: customerHashedPassword,
      role: "customer",
      createdAt: new Date(),
    })

    console.log("Seeded initial users")
  }
}

