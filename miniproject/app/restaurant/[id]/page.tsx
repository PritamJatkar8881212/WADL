"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, Clock, MapPin, DollarSign, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { restaurants } from "@/data/restaurants"
import type { Restaurant as RestaurantType } from "@/data/restaurants"

export default function RestaurantDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { items, addItem, getItemCount } = useCart()
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the restaurant from our hardcoded data
    const foundRestaurant = restaurants.find((r) => r._id === id)
    setRestaurant(foundRestaurant || null)
    setLoading(false)
  }, [id])

  const handleAddToCart = (menuItem: any) => {
    if (!restaurant) return

    addItem({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      imageUrl: menuItem.imageUrl,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    })
  }

  if (loading) {
    return <RestaurantDetailSkeleton />
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Restaurant not found</h2>
        <Link href="/">
          <Button>Go back to home</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to restaurants
          </Link>

          <Button variant="outline" className="relative" onClick={() => router.push("/cart")}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Cart
            {getItemCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                {getItemCount()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={restaurant.imageUrl || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg mb-2">{restaurant.cuisine}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{restaurant.priceRange}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{restaurant.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="menu">
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Restaurant Info</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {restaurant.menu.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restaurant.menu.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {item.name}
                            {item.isVegetarian && (
                              <span className="ml-2 inline-block w-4 h-4 bg-green-500 rounded-full"></span>
                            )}
                          </h3>
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={() => handleAddToCart(item)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No menu items available.</p>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            {restaurant.reviews.length > 0 ? (
              <div className="space-y-4">
                {restaurant.reviews.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{review.userName}</h3>
                      <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                        <Star className="h-3 w-3 fill-green-800 text-green-800" />
                        <span className="text-sm font-medium ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </TabsContent>

          <TabsContent value="info">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">About {restaurant.name}</h2>
              <p className="text-gray-700 mb-4">{restaurant.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <p className="text-gray-700">{restaurant.location}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Cuisine</h3>
                  <p className="text-gray-700">{restaurant.cuisine}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function RestaurantDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <div className="relative h-64 md:h-96 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="menu">
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Restaurant Info</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <Skeleton className="w-20 h-20 rounded-md flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

