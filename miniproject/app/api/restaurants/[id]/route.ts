import { NextResponse } from "next/server"
import { restaurants } from "@/data/restaurants"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const restaurant = restaurants.find((r) => r._id === id)

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    return NextResponse.json(restaurant)
  } catch (error) {
    console.error("Error fetching restaurant:", error)
    return NextResponse.json({ error: "Failed to fetch restaurant" }, { status: 500 })
  }
}

