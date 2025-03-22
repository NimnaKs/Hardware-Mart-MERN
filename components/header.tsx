"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, User, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 md:gap-8 pl-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[360px]">
              <div className="flex flex-col gap-6 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold text-2xl pl-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>HardwareMart</span>
                  <span className="text-primary">.io</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`text-lg px-4 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-accent text-primary"
                          : "text-muted-foreground hover:bg-accent/50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="hidden md:flex items-center gap-1 font-semibold text-2xl"
          >
            <span>HardwareMart</span>
            <span className="text-primary">.io</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 ml-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-background pl-10 pr-4 rounded-lg h-10 md:w-[240px] lg:w-[320px]"
            />
          </div>

          <ModeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="cursor-pointer">
                    Orders
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/products" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}

          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary hover:bg-primary/90">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
