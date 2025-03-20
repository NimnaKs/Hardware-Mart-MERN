import jwt from "jsonwebtoken"
import type { User } from "./types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const JWT_EXPIRES_IN = "7d"

export function signJwtToken(payload: { id: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyJwtToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string
      email: string
      role: string
      iat: number
      exp: number
    }
  } catch (error) {
    return null
  }
}

export function getUserFromToken(token?: string): { user: User | null; token: string | null } {
  if (!token) {
    return { user: null, token: null }
  }

  try {
    const decoded = verifyJwtToken(token)
    if (!decoded) {
      return { user: null, token: null }
    }

    return {
      user: {
        id: decoded.id,
        name: "", // We don't store name in the token for security reasons
        email: decoded.email,
        role: decoded.role as "admin" | "customer",
      },
      token,
    }
  } catch (error) {
    return { user: null, token: null }
  }
}

