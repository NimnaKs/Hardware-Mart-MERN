import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"
import type { Order } from "../types"

export async function createOrder(orderData: Omit<Order, "id" | "createdAt">): Promise<Order> {
  const client = await clientPromise
  const collection = client.db().collection("orders")

  const result = await collection.insertOne({
    ...orderData,
    createdAt: new Date().toISOString(),
  })

  return {
    id: result.insertedId.toString(),
    ...orderData,
    createdAt: new Date().toISOString(),
  }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const client = await clientPromise
  const collection = client.db().collection("orders")

  const orders = await collection.find({ userId }).sort({ createdAt: -1 }).toArray()

  return orders.map((order) => ({
    id: order._id.toString(),
    userId: order.userId,
    items: order.items,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
    shippingAddress: order.shippingAddress,
  }))
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const client = await clientPromise
    const collection = client.db().collection("orders")

    const order = await collection.findOne({ _id: new ObjectId(id) })

    if (!order) return null

    return {
      id: order._id.toString(),
      userId: order.userId,
      items: order.items,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      shippingAddress: order.shippingAddress,
    }
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<boolean> {
  try {
    const client = await clientPromise
    const collection = client.db().collection("orders")

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } })

    return result.modifiedCount === 1
  } catch (error) {
    console.error("Error updating order status:", error)
    return false
  }
}

