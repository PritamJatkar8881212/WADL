"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const { user, logout } = useAuth()
  const { getItemCount } = useCart()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHomePage = pathname === "/"
  // const isTransparent = isHomePage && !mobileMenuOpen;

  return (
    <header className={`sticky top-0 z-50 w-full bg-white shadow-sm`}>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-500">FoodHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-red-500 transition-colors">
            Home
          </Link>
          <Link href="/restaurants" className="text-gray-700 hover:text-red-500 transition-colors">
            Restaurants
          </Link>
          {user ? (
            <>
              <Link href="/orders" className="text-gray-700 hover:text-red-500 transition-colors">
                My Orders
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 flex items-center gap-2">
                    <User size={18} />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" className="">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <Link href="/cart">
            <Button variant="ghost" className="text-gray-700 relative p-2">
              <ShoppingCart size={20} />
              {getItemCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {getItemCount()}
                </Badge>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link href="/cart" className="mr-2">
            <Button variant="ghost" className="text-gray-700 relative p-2">
              <ShoppingCart size={20} />
              {getItemCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {getItemCount()}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="ghost" className="text-gray-700 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-red-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/restaurants"
              className="block py-2 text-gray-700 hover:text-red-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            {user ? (
              <>
                <Link
                  href="/orders"
                  className="block py-2 text-gray-700 hover:text-red-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  href="/profile"
                  className="block py-2 text-gray-700 hover:text-red-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center py-2 text-red-500"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

