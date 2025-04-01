"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react";
import Button from "./ui/Button";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

const Layout = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>

            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://media.istockphoto.com/id/1321257574/photo/chakra-muladhara-red-shining-yoga-symbol-om-sign-sacral-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=Nb_6BzYewiarng649MY2GIUO36RWAZf79rm7jaAWzzg="
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-primary">PujaStore</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium ${
                location.pathname === "/"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium ${
                location.pathname === "/categories"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              Categories
            </Link>
            <Link
              to="/offers"
              className={`text-sm font-medium ${
                location.pathname === "/offers"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              Special Offers
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                location.pathname === "/about"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium ${
                location.pathname === "/contact"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className={`text-sm font-medium ${
                location.pathname === "/faq"
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {showSearch && (
          <div className="border-t py-3 px-4 bg-background">
            <SearchBar />
          </div>
        )}
      </header>

      {showMobileMenu && (
        <MobileMenu onClose={() => setShowMobileMenu(false)} />
      )}

      <main>{children}</main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PujaStore</h3>
              <p className="text-sm">
                Your one-stop shop for all puja essentials and spiritual
                products.
              </p>
              <div className="flex gap-4 mt-4">{/* Social links */}</div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="hover:underline">
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/shipping" className="hover:underline">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:underline">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="hover:underline">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <address className="text-sm not-italic">
                <p>123 Temple Street</p>
                <p>Spiritual City, SP 12345</p>
                <p className="mt-2">Email: info@pujastore.com</p>
                <p>Phone: +91 1234567890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-primary-foreground/20 text-center text-sm">
            <p>© {new Date().getFullYear()} PujaStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
