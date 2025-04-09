"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (orderId) {
      // In a real app, this would be an API call to get the order details
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o: Order) => o.orderId === orderId)

      if (foundOrder) {
        setOrder(foundOrder)
      }
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">Order not found</h1>
          <p className="text-gray-500 mb-6">We couldn't find the order you're looking for.</p>
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Your order has been placed and is being prepared by the restaurant.</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{order.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-orange-500 mr-1" />
                  <p className="font-medium text-orange-500">{order.status}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery Address</p>
                <p className="font-medium">{order.deliveryAddress}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Items</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">
                        {item.quantity} x {item.name}
                      </p>
                      <p className="text-sm text-gray-500">{item.restaurantName}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              {order.couponCode && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon ({order.couponCode})</span>
                  <span>-$0.00</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <p className="text-gray-500 text-sm mb-2">Estimated delivery time: 30-45 minutes</p>
              <Link href="/orders">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button variant="link" className="flex items-center mx-auto">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

