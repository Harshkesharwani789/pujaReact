"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import Button from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export default function OffersPage() {
  const [sortBy, setSortBy] = useState("featured");
  const [currentTab, setCurrentTab] = useState("all");

  // Sample data
  const offerProducts = [
    {
      id: "5",
      title: "Marble Lakshmi Idol",
      price: 1899,
      discountPrice: 1599,
      image:
        "https://plus.unsplash.com/premium_photo-1676093698112-c35300feada7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFyYmxlJTIwbGFrc2htaSUyMGlkb2x8ZW58MHx8MHx8fDA%3D",
      category: "Idols & Statues",
      rating: 4.8,
      badge: "15% OFF",
      offerType: "discount",
    },
    {
      id: "10",
      title: "Brass Pooja Thali",
      price: 1299,
      discountPrice: 999,
      image:
        "https://images.unsplash.com/photo-1700765020008-7fd77c847f8a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9vamElMjB0aGFsaXxlbnwwfHwwfHx8MA%3D%3D",
      category: "Pooja Thali Sets",
      rating: 4.5,
      badge: "SALE",
      offerType: "discount",
    },
    {
      id: "13",
      title: "Brass Oil Lamp",
      price: 899,
      discountPrice: 699,
      image:
        "https://media.istockphoto.com/id/1772738631/photo/diya-lamp-stand-in-diwali-illuminated-light-in-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=RZCwpBvmwQ5jVpSUD5Iwc7gg9sOGEVJwb7N0Q1DU714=",
      category: "Diyas & Lamps",
      rating: 4.7,
      badge: "22% OFF",
      offerType: "discount",
    },
    {
      id: "20",
      title: "Rangoli Colors Set",
      price: 349,
      discountPrice: 299,
      image:
        "https://images.unsplash.com/photo-1659451336076-9857b8cbef10?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZ29saSUyMGNvbG9zfGVufDB8fDB8fHww",
      category: "Diwali Special",
      rating: 4.6,
      badge: "DEAL",
      offerType: "discount",
    },
    {
      id: "60",
      title: "Complete Puja Essentials Kit",
      price: 3999,
      discountPrice: 2999,
      image:
        "https://plus.unsplash.com/premium_photo-1736517212370-e3a9cfdc22c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW5jZW5zZSUyMCUyNiUyMERob29wfGVufDB8fDB8fHww",
      category: "Puja Kits",
      rating: 4.9,
      badge: "BUNDLE OFFER",
      offerType: "bundle",
    },
    {
      id: "61",
      title: "Diwali Decoration Set",
      price: 2499,
      discountPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGl3YWxpJTIwc3BlY2lhbHxlbnwwfHwwfHx8MA%3D%3D",
      category: "Diwali Special",
      rating: 4.8,
      badge: "BUNDLE OFFER",
      offerType: "bundle",
    },
    {
      id: "70",
      title: "Brass Diya Set (Buy 1 Get 1)",
      price: 1299,
      discountPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1590140114448-97f1da1b0257?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhc3MlMjBpdGVtc3xlbnwwfHwwfHx8MA%3D%3D",
      category: "Diyas & Lamps",
      rating: 4.6,
      badge: "BOGO",
      offerType: "bogo",
    },
    {
      id: "71",
      title: "Incense Sticks Pack (Buy 1 Get 1)",
      price: 399,
      discountPrice: 399,
      image:
        "https://plus.unsplash.com/premium_photo-1736517212370-e3a9cfdc22c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW5jZW5zZSUyMCUyNiUyMERob29wfGVufDB8fDB8fHww",
      category: "Incense & Dhoop",
      rating: 4.5,
      badge: "BOGO",
      offerType: "bogo",
    },
  ];

  // Filter products based on current tab
  const filteredProducts =
    currentTab === "all"
      ? offerProducts
      : offerProducts.filter((product) => product.offerType === currentTab);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return (a.discountPrice || a.price) - (b.discountPrice || b.price);
    } else if (sortBy === "price-high-low") {
      return (b.discountPrice || b.price) - (a.discountPrice || a.price);
    } else if (sortBy === "discount") {
      const discountA = a.price - (a.discountPrice || a.price);
      const discountB = b.price - (b.discountPrice || b.price);
      return discountB - discountA;
    }
    return 0; // Default to featured order
  });

  return (
    <Layout>
      <div className="container py-12">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg"></div>
          <div className="relative py-8 px-6 md:px-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Special Offers
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our exclusive deals, discounts, and limited-time offers on
              a wide range of puja essentials and spiritual products.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                Up to 25% OFF
              </Badge>
              <Badge
                variant="outline"
                className="bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                Buy One Get One Free
              </Badge>
              <Badge
                variant="outline"
                className="bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                Bundle Deals
              </Badge>
              <Badge
                variant="outline"
                className="bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                Free Shipping
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="w-full md:w-auto">
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`px-4 py-2 ${
                  currentTab === "all" ? "bg-primary text-white" : "bg-white"
                }`}
                onClick={() => setCurrentTab("all")}
              >
                All Offers
              </button>
              <button
                className={`px-4 py-2 ${
                  currentTab === "discount"
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
                onClick={() => setCurrentTab("discount")}
              >
                Discounts
              </button>
              <button
                className={`px-4 py-2 ${
                  currentTab === "bundle" ? "bg-primary text-white" : "bg-white"
                }`}
                onClick={() => setCurrentTab("bundle")}
              >
                Bundles
              </button>
              <button
                className={`px-4 py-2 ${
                  currentTab === "bogo" ? "bg-primary text-white" : "bg-white"
                }`}
                onClick={() => setCurrentTab("bogo")}
              >
                Buy 1 Get 1
              </button>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-[200px] px-3 py-2 border rounded-md"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              discountPrice={product.discountPrice}
              image={product.image}
              category={product.category}
              rating={product.rating}
              badge={product.badge}
            />
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-lg p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Limited Time Offers</h2>
            <p className="text-muted-foreground">
              These special deals are only available for a limited time. Don't
              miss out!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg border p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M19.73 14.87a7 7 0 1 0-9.46 0L12 20l1.73-5.13Z" />
                  <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Free Shipping Nationwide</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Enjoy free shipping on all orders above ₹1000 across India.
                </p>
                <Button size="sm" asChild>
                  <Link to="/categories">Shop Now</Link>
                </Button>
              </div>
            </div>

            <div className="bg-background rounded-lg border p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
                  <path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0 2 2v2" />
                  <path d="M12 11v4" />
                  <path d="M15 13h-6" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">10% Off First Order</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Use code FIRST10 at checkout to get 10% off your first
                  purchase.
                </p>
                <Button size="sm" asChild>
                  <Link to="/signup">Sign Up Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How long do special offers last?",
                a: "Most of our special offers are available for a limited time, typically 1-2 weeks. The exact duration is mentioned on the product page.",
              },
              {
                q: "Can I combine multiple offers?",
                a: "Generally, only one offer can be applied per product. However, you can use a coupon code along with products that are already on sale.",
              },
              {
                q: "How do Buy One Get One offers work?",
                a: "For BOGO offers, add the product to your cart and the second item will be automatically added at checkout at no additional cost.",
              },
              {
                q: "Are discounted items eligible for return?",
                a: "Yes, our standard return policy applies to discounted items as well, unless specifically mentioned otherwise.",
              },
            ].map((faq, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
