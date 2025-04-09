"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import RestaurantCard from "@/components/restaurant-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { restaurants as initialRestaurants } from "@/data/restaurants"
import { useAuth } from "@/contexts/auth-context"
import type { Restaurant } from "@/data/restaurants"

export default function Home() {
  const { user } = useAuth()
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants)
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(initialRestaurants)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredRestaurants(restaurants)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTermLower) ||
        restaurant.cuisine.toLowerCase().includes(searchTermLower) ||
        restaurant.location.toLowerCase().includes(searchTermLower),
    )
    setFilteredRestaurants(filtered)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">
            {user ? `Welcome back, ${user.name}!` : "Discover the best food & drinks"}
          </h1>
          <p className="text-center mb-6 text-white/80">
            {user
              ? "Order your favorite meals from the best restaurants in town"
              : "Order food from the finest restaurants in your area"}
          </p>
          <div className="max-w-md mx-auto flex">
            <Input
              type="text"
              placeholder="Search for restaurants, cuisines..."
              className="rounded-l-md border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button className="rounded-l-none bg-white text-red-500 hover:bg-gray-100" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Listings */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

