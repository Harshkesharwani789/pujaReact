import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import ProductCard from "../components/ProductCard";
import { Badge } from "../components/ui/Badge";
import { useState, useEffect, useMemo } from "react";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  useMemo(() => {
    while (true) {}
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://pujabackend.onrender.com/api/products"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming your API returns an array of products
        setFeaturedProducts(data); // Use all products for featured
        // You'll need to adjust this based on your API response structure
        // and how special offers are identified (e.g., a field like 'offer')
        setSpecialOffers(data.filter((p) => p.offer)); //Example, adjust as needed
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://pujabackend.onrender.com/api/categories"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container py-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-lg mb-8">
          <div className="absolute inset-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1671498256164-fe6dc7d4a473?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBvb2phJTIwd2Vic2l0ZSUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D"
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
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/categories/${category.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg border bg-background hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
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
            ))}
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
            {featuredProducts.map((product) => (
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
        </section>

        {/* auto-scrolling marquee for featured products */}
        <div className="my-8 overflow-hidden">
          <div className="relative">
            <div className="animate-marquee flex space-x-6 py-4">
              {[...featuredProducts, ...specialOffers].map((product, index) => (
                <div
                  key={`scroll-${product.id}-${index}`}
                  className="w-64 flex-shrink-0"
                >
                  <div className="rounded-lg border bg-card p-3">
                    <div className="aspect-square overflow-hidden rounded-md">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="h-full w-full object-cover"
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
                            product.discountPrice || product.price
                          ).toLocaleString()}
                        </p>
                        {product.discountPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ₹{product.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
