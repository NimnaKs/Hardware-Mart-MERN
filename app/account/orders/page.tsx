"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?callbackUrl=/account/orders");
    }

    const fetchOrders = async () => {
      if (!user) return;

      try {
        // In a real app, fetch from API
        // For now, we'll use mock data
        const mockOrders: Order[] = [
          {
            id: "1",
            userId: user.id,
            items: [
              {
                id: "1",
                name: "Professional Hammer",
                description: "Heavy-duty hammer with ergonomic grip",
                price: 29.99,
                category: "Hand Tools",
                stock: 50,
                quantity: 1,
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                id: "3",
                name: "Precision Screwdriver Set",
                description: "Set of precision screwdrivers",
                price: 19.99,
                category: "Hand Tools",
                stock: 100,
                quantity: 2,
                image: "/placeholder.svg?height=300&width=300",
              },
            ],
            total: 69.97,
            status: "delivered",
            createdAt: "2025-03-15T10:30:00Z",
            shippingAddress: {
              firstName: "John",
              lastName: "Doe",
              address: "123 Main St",
              city: "Anytown",
              postalCode: "12345",
              country: "USA",
              phone: "555-123-4567",
            },
          },
          {
            id: "2",
            userId: user.id,
            items: [
              {
                id: "2",
                name: "Cordless Drill Set",
                description: "Powerful cordless drill with attachments",
                price: 149.99,
                category: "Power Tools",
                stock: 25,
                quantity: 1,
                image: "/placeholder.svg?height=300&width=300",
              },
            ],
            total: 149.99,
            status: "shipped",
            createdAt: "2025-03-10T14:45:00Z",
            shippingAddress: {
              firstName: "John",
              lastName: "Doe",
              address: "123 Main St",
              city: "Anytown",
              postalCode: "12345",
              country: "USA",
              phone: "555-123-4567",
            },
          },
        ];

        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {loading ? (
        <OrdersSkeleton />
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">No orders found</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet.
          </p>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className={
                      order.status === "delivered"
                        ? "bg-green-500"
                        : order.status === "shipped"
                        ? "bg-blue-500"
                        : order.status === "processing"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Items:</span>
                    <span>
                      {order.items.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-40 mb-6" />

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
