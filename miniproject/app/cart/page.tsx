"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = getTotal()
  const deliveryFee = 2.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + deliveryFee + tax

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=cart")
      return
    }

    if (items.length === 0) {
      return
    }

    setIsCheckingOut(true)
  }

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      alert("Please enter a delivery address")
      return
    }

    // In a real app, this would be an API call to create an order
    const order = {
      items,
      subtotal,
      deliveryFee,
      tax,
      total,
      deliveryAddress,
      couponCode: couponCode || null,
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: "Confirmed",
    }

    // Save order to localStorage for demo purposes
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))

    // Clear cart and redirect to order confirmation
    clearCart()
    router.push(`/order-confirmation?orderId=${order.orderId}`)
  }

  if (items.length === 0 && !isCheckingOut) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to restaurants
            </Link>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/">
                <Button>Browse Restaurants</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to restaurants
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Cart {items.length > 0 && `(${items.length})`}</CardTitle>
              </CardHeader>

              {!isCheckingOut && items.length > 0 && (
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.restaurantName}</p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-transparent mt-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}

              {isCheckingOut && (
                <CardContent className="space-y-4">
                  <h3 className="font-semibold text-lg">Delivery Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your full address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      required
                    />
                  </div>

                  <h3 className="font-semibold text-lg mt-6">Order Summary</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {!isCheckingOut && (
                  <div className="pt-2">
                    <Label htmlFor="coupon">Coupon Code</Label>
                    <div className="flex mt-1">
                      <Input
                        id="coupon"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button className="rounded-l-none">Apply</Button>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                {!isCheckingOut ? (
                  <Button className="w-full" onClick={handleCheckout} disabled={items.length === 0}>
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

