"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Clock, Package, CheckCircle, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  restaurantId: string
  restaurantName: string
}

interface Order {
  orderId: string
  orderDate: string
  status: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
  deliveryAddress: string
  couponCode: string | null
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=orders")
      return
    }

    // In a real app, this would be an API call to get the user's orders
    const userOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(userOrders)
  }, [user, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Clock className="h-5 w-5 text-orange-500" />
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Package className="h-5 w-5 text-blue-500" />
    }
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}
              </div>
            ) : (
              <EmptyOrdersState />
            )}
          </TabsContent>

          <TabsContent value="active">
            {orders.filter((o) => o.status !== "Delivered").length > 0 ? (
              <div className="space-y-4">
                {orders
                  .filter((o) => o.status !== "Delivered")
                  .map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))}
              </div>
            ) : (
              <EmptyOrdersState message="You don't have any active orders" />
            )}
          </TabsContent>

          <TabsContent value="completed">
            {orders.filter((o) => o.status === "Delivered").length > 0 ? (
              <div className="space-y-4">
                {orders
                  .filter((o) => o.status === "Delivered")
                  .map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))}
              </div>
            ) : (
              <EmptyOrdersState message="You don't have any completed orders" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  function OrderCard({ order }: { order: Order }) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">Order #{order.orderId.slice(-6)}</CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleDateString()} • {order.items.length} items
              </p>
            </div>
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className="ml-1 font-medium">{order.status}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">${order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{order.deliveryAddress.substring(0, 30)}...</p>
            </div>
            <Link href={`/order-confirmation?orderId=${order.orderId}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  function EmptyOrdersState({ message = "You haven't placed any orders yet" }) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="flex justify-center mb-4">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-500 mb-6">{message}</p>
          <Link href="/">
            <Button>Browse Restaurants</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }
}

