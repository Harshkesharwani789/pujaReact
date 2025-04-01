"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft, Heart, ShoppingCart, Share2 } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import useWishlist from "../stores/useWishlist";
import useCart from "../stores/useCart";
import useToast from "../hooks/useToast";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const toast = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemove = (id, title) => {
    removeFromWishlist(id);
    toast({
      title: "Item removed",
      description: `${title} has been removed from your wishlist.`,
    });
  };

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      price: item.discountPrice || item.price,
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${item.title} has been added to your cart.`,
    });
  };

  const handleShare = (item) => {
    // In a real app, this would use the Web Share API if available
    navigator.clipboard.writeText(
      `Check out this amazing product: ${item.title} at PujaStore!`
    );
    toast({
      title: "Link copied",
      description: "Product link copied to clipboard.",
    });
  };

  if (!mounted) {
    return null; // Prevent hydration errors
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-12">
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your wishlist yet.
            </p>
            <Button asChild>
              <Link to="/categories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg border bg-background p-3 hover:shadow-md transition-shadow"
            >
              <div className="absolute right-5 top-5 z-10 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={() => handleShare(item)}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm"
                  onClick={() => handleRemove(item.id, item.title)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <Link to={`/products/${item.id}`}>
                <div className="aspect-square overflow-hidden rounded-md">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="pt-3">
                  <h3 className="font-medium text-lg line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.category}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-semibold">
                      ₹{(item.discountPrice || item.price).toLocaleString()}
                    </p>
                    {item.discountPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        ₹{item.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
              <div className="mt-3">
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/categories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          {items.length > 0 && (
            <Button variant="outline" onClick={() => clearWishlist()}>
              Clear Wishlist
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
