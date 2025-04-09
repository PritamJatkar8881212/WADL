import Link from "next/link"
import { Star, Clock } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "@/data/restaurants"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant._id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={restaurant.imageUrl || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-white text-black font-medium">{restaurant.priceRange}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-1 truncate">{restaurant.name}</h3>
          <p className="text-gray-600 mb-2 text-sm">{restaurant.cuisine}</p>
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center bg-green-100 text-green-800 px-1 rounded">
              <Star className="h-3 w-3 fill-green-800 text-green-800" />
              <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
            </div>
            <span className="text-xs text-gray-500">•</span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-3 w-3 mr-1" />
              {restaurant.deliveryTime}
            </div>
          </div>
          <p className="text-gray-500 text-sm truncate">{restaurant.location}</p>
        </CardContent>
        <CardFooter className="bg-gray-50 px-4 py-2 text-sm text-gray-600">
          Free delivery on your first order
        </CardFooter>
      </Card>
    </Link>
  )
}

