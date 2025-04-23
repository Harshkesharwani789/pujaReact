"use client";

import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import ProductCard from "../components/ProductCard";
import { Badge } from "../components/ui/Badge";
import { useState, useEffect } from "react";

const HomePage = ({ setToken }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Add loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken && setToken(""); // Add null check for setToken
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch products
        const productsResponse = await fetch(
          "https://pujabackend.onrender.com/api/products"
        );
        if (!productsResponse.ok) {
          throw new Error(
            `Products API error! status: ${productsResponse.status}`
          );
        }
        const productsData = await productsResponse.json();
        console.log("Products Data:", productsData);

        // Fetch categories
        const categoriesResponse = await fetch(
          "https://pujabackend.onrender.com/api/categories"
        );
        if (!categoriesResponse.ok) {
          throw new Error(
            `Categories API error! status: ${categoriesResponse.status}`
          );
        }
        const categoriesData = await categoriesResponse.json();
        console.log("Categories Data:", categoriesData);

        // Update state with fetched data
        setFeaturedProducts(productsData || []);
        setSpecialOffers(productsData?.filter((p) => p.offer) || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        // Set empty arrays to prevent rendering errors
        setFeaturedProducts([]);
        setSpecialOffers([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state UI
  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <p className="mt-4 text-lg">Loading products and categories...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state UI
  if (error) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Something went wrong
              </h2>
              <p className="mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Navigation Controls */}
        <div className="flex justify-end gap-4 mb-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-sm text-primary hover:underline"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm text-primary hover:underline"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-lg mb-8">
          <div className="absolute inset-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1671498256164-fe6dc7d4a473?w=900&auto=format&fit=crop&q=60"
              alt="Featured banner"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
          </div>
          <div className="relative py-12 px-6 md:py-24 md:px-12 max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Diwali Special Collection
            </h1>
            <p className="text-white/90 mb-6">
              Discover our exclusive range of premium puja items and decorations
              for this festive season. Limited time offers available!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/categories/diwali">Shop Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/offers">View Offers</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="my-6 bg-primary/10 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-primary text-primary-foreground"
            >
              NEW
            </Badge>
            <p className="text-sm md:text-base">
              Diwali Special Collection is now available! Limited stock.
            </p>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
            {/* Timer - Replace with actual timer logic if needed */}
            <div className="bg-primary/10 px-2 py-1 rounded">
              <span className="font-semibold">05</span>
              <span className="text-xs ml-1">d</span>
            </div>
            <span>:</span>
            <div className="bg-primary/10 px-2 py-1 rounded">
              <span className="font-semibold">12</span>
              <span className="text-xs ml-1">h</span>
            </div>
            <span>:</span>
            <div className="bg-primary/10 px-2 py-1 rounded">
              <span className="font-semibold">45</span>
              <span className="text-xs ml-1">m</span>
            </div>
            <span>:</span>
            <div className="bg-primary/10 px-2 py-1 rounded">
              <span className="font-semibold">30</span>
              <span className="text-xs ml-1">s</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link
              to="/categories"
              className="text-sm text-primary hover:underline flex items-center"
            >
              View All Categories
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/categories/${category.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg border bg-background hover:shadow-md transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`https://pujabackend.onrender.com/${category.image}`}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback UI when no categories are available
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No categories available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <Link
              to="/featured"
              className="text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  image={`https://pujabackend.onrender.com/${product.image}`}
                  category={product.category}
                  rating={product.rating}
                />
              ))
            ) : (
              // Fallback UI when no products are available
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No products available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* auto-scrolling marquee for featured products */}
        {(featuredProducts.length > 0 || specialOffers.length > 0) && (
          <div className="my-8 overflow-hidden">
            <div className="relative">
              <div className="animate-marquee flex space-x-6 py-4">
                {[...featuredProducts, ...specialOffers].map(
                  (product, index) => (
                    <div
                      key={`scroll-${product.id || index}-${index}`}
                      className="w-64 flex-shrink-0"
                    >
                      <div className="rounded-lg border bg-card p-3">
                        <div className="aspect-square overflow-hidden rounded-md">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="pt-3">
                          <h3 className="font-medium line-clamp-1">
                            {product.title}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <p className="font-semibold">
                              ₹
                              {(
                                product.discountPrice ||
                                product.price ||
                                0
                              ).toLocaleString()}
                            </p>
                            {product.discountPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                ₹{(product.price || 0).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Newsletter */}
        <section className="my-12">
          <div className="rounded-lg bg-primary/5 p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Stay updated with our latest products, special offers, and
              spiritual insights.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
