"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Button from "./ui/Button";
import useCart from "../stores/useCart";
import useWishlist from "../stores/useWishlist";
import useToast from "../hooks/useToast";

const ProductCard = ({
  id,
  title,
  price,
  discountPrice,
  image,
  category,
  rating,
  badge,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(
    isInWishlist ? isInWishlist(id) : false
  );
  const toast = useToast();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price: discountPrice || price,
      originalPrice: discountPrice ? price : null,
      image,
      category,
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      if (removeFromWishlist) {
        removeFromWishlist(id);
      }
      setIsWishlisted(false);
      toast({
        title: "Removed from wishlist",
        description: `${title} has been removed from your wishlist.`,
      });
    } else {
      if (addToWishlist) {
        addToWishlist({
          id,
          title,
          price,
          discountPrice,
          image,
          category,
        });
      }
      setIsWishlisted(true);
      toast({
        title: "Added to wishlist",
        description: `${title} has been added to your wishlist.`,
      });
    }
  };

  return (
    <div className="group relative rounded-lg border bg-background p-3 hover:shadow-md transition-shadow">
      {badge && (
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
            {badge}
          </span>
        </div>
      )}
      <div className="absolute right-5 top-5 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm"
          onClick={handleWishlist}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      <Link to={`/products/${id}`}>
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="pt-3">
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
          <div className="flex items-center gap-1 mt-1">
            {rating && (
              <>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-sm font-medium ml-1">{rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">•</span>
              </>
            )}
            <span className="text-sm text-muted-foreground">In Stock</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <p className="font-semibold">
              ₹{(discountPrice || price).toLocaleString()}
            </p>
            {discountPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ₹{price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-3">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
