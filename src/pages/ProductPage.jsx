"use client";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Check,
  Star,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ProductCard from "../components/ProductCard";
import useCart from "../stores/useCart";
import useWishlist from "../stores/useWishlist";
import useToast from "../hooks/useToast";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Sample data
  const productsData = [
    {
      id: "1",
      title: "Brass Ganesh Idol",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop",
      category: "Idols & Statues",
      description:
        "This beautifully crafted brass Ganesh idol is perfect for your home temple or as a decorative piece. Made with high-quality brass and intricate detailing, this idol represents Lord Ganesha, the remover of obstacles and the god of new beginnings.",
      specifications:
        "Material: Brass\nHeight: 8 inches\nWidth: 5 inches\nWeight: 1.2 kg",
      care: "Clean with a soft dry cloth. Avoid using water or harsh chemicals.",
      rating: 4.9,
      reviews: 124,
    },
    {
      id: "2",
      title: "Silver Pooja Thali Set",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=600&auto=format&fit=crop",
      category: "Pooja Thali Sets",
      description:
        "This elegant silver pooja thali set includes all the essential items needed for daily rituals and special occasions. The set features a beautifully designed thali with intricate patterns, along with matching accessories.",
      specifications:
        "Material: German Silver\nThali Diameter: 10 inches\nItems Included: Thali, Bell, Diya, Incense Holder, Small Bowls (2)\nWeight: 800g",
      care: "Clean with a soft dry cloth. For stubborn stains, use a mild silver polish.",
      rating: 4.7,
      reviews: 89,
    },
    // More products...
  ];

  // Sample reviews
  const sampleReviews = [
    {
      id: 1,
      name: "Rajesh Sharma",
      rating: 5,
      date: "2023-10-15",
      title: "Excellent quality",
      comment:
        "The craftsmanship is outstanding. Very pleased with my purchase.",
      verified: true,
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 4,
      date: "2023-09-22",
      title: "Beautiful piece",
      comment:
        "The product looks even better in person. The only reason for 4 stars is that delivery took longer than expected.",
      verified: true,
    },
    // More reviews...
  ];

  useEffect(() => {
    // Find the product by ID
    const foundProduct = productsData.find((p) => p.id === id);
    setProduct(foundProduct);

    // Get related products
    if (foundProduct) {
      const related = productsData
        .filter((p) => p.id !== id && p.category === foundProduct.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }

    // Check if product is in wishlist
    if (isInWishlist) {
      setIsWishlisted(isInWishlist(id));
    }
  }, [id, isInWishlist]);

  if (!product) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/categories">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Product images
  const productImages = [
    product.image ||
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626196340145-e7c1b9e9fbf7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600255821058-c4f89958d155?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
  ];

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      setIsWishlisted(true);
      toast({
        title: "Added to wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Check out this amazing product: ${product.title} at PujaStore!`
    );
    toast({
      title: "Link copied",
      description: "Product link copied to clipboard.",
    });
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-primary">
            Categories
          </Link>
          <span>/</span>
          <Link
            to={`/categories/${product.category
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/&/g, "")}`}
            className="hover:text-primary"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <div className="relative rounded-lg overflow-hidden border mb-4">
              <img
                src={productImages[activeImage] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-auto object-cover"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
                onClick={() =>
                  setActiveImage(
                    (activeImage - 1 + productImages.length) %
                      productImages.length
                  )
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
                onClick={() =>
                  setActiveImage((activeImage + 1) % productImages.length)
                }
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border rounded-md overflow-hidden ${
                    activeImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.title} - view ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{product.category}</p>

            <div className="text-3xl font-bold mb-6">
              ₹{product.price.toLocaleString()}
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number.parseInt(e.target.value))
                    }
                    className="w-16 rounded-none text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </Button>
                </div>

                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                  {addedToCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" onClick={handleWishlist}>
                  <Heart
                    className={`mr-2 h-4 w-4 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t pt-6">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    On orders above ₹1000
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">
                    100% secure payment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">
                    10 day return policy
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="border-b">
                <div className="flex space-x-4">
                  <button
                    className={`py-2 px-4 border-b-2 ${
                      activeTab === "details"
                        ? "border-primary text-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("details")}
                  >
                    Details
                  </button>
                  <button
                    className={`py-2 px-4 border-b-2 ${
                      activeTab === "specifications"
                        ? "border-primary text-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("specifications")}
                  >
                    Specifications
                  </button>
                  <button
                    className={`py-2 px-4 border-b-2 ${
                      activeTab === "care"
                        ? "border-primary text-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("care")}
                  >
                    Care Instructions
                  </button>
                </div>
              </div>
              <div className="p-4 border rounded-b-lg">
                {activeTab === "details" && <p>{product.description}</p>}
                {activeTab === "specifications" && (
                  <pre className="whitespace-pre-wrap font-sans">
                    {product.specifications}
                  </pre>
                )}
                {activeTab === "care" && <p>{product.care}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{product.rating}</div>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on {product.reviews} reviews
                </p>
                <Button>Write a Review</Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-4">
                {sampleReviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{review.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{review.comment}</p>
                    <p className="text-sm text-muted-foreground">
                      By {review.name}
                    </p>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
                rating={product.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
