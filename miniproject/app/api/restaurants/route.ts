import { NextResponse } from "next/server"
import { restaurants } from "@/data/restaurants"

export async function GET() {
  try {
    return NextResponse.json(restaurants)
  } catch (error) {
    console.error("Error fetching restaurants:", error)
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 })
  }
}

