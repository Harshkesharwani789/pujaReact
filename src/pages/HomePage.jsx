import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import ProductCard from "../components/ProductCard";
import { Badge } from "../components/ui/Badge";

const HomePage = () => {
  // Sample data
  const featuredProducts = [
    {
      id: "1",
      title: "Brass Ganesh Idol",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1567878673047-0451c851056e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJhc2glMjBnYW5lc2glMjBpZG9sJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
      category: "Idols & Statues",
      rating: 4.9,
    },
    {
      id: "2",
      title: "Silver Pooja Thali Set",
      price: 2499,
      image:
        "https://plus.unsplash.com/premium_photo-1675053533678-615611ecc0b0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2lsdmVyJTIwcG9vamElMjB0aGFsaSUyMHNldHxlbnwwfHwwfHx8MA%3D%3D",
      category: "Pooja Thali Sets",
      rating: 4.7,
    },
    {
      id: "3",
      title: "Decorative Diya Set",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1605302977593-fe0329b1effd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVjb3JhdGl2ZSUyMGRpeWElMjBzZXR8ZW58MHx8MHx8fDA%3D",
      category: "Diyas & Lamps",
      rating: 4.5,
    },
    {
      id: "4",
      title: "Sandalwood Incense Sticks",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1611800065908-233b597db552?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FuZGFsd29vZCUyMEluY2Vuc2UlMjBTdGlja3N8ZW58MHx8MHx8fDA%3D",
      category: "Incense & Dhoop",
      rating: 4.8,
    },
  ];

  const specialOffers = [
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
    },
  ];

  const categories = [
    {
      title: "Idols & Statues",
      image:
        "https://images.unsplash.com/photo-1590142588602-73354f46d6a0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGlkb2xzJTIwYW5kJTIwc3RhdHVlc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/categories/idols",
    },
    {
      title: "Pooja Thali Sets",
      image:
        "https://media.istockphoto.com/id/2168877442/photo/close-up-of-a-beautifully-decorated-pooja-thali-for-festival-celebration-to-worship.webp?a=1&b=1&s=612x612&w=0&k=20&c=2y8jgnE3dy7ZFapRX9Wni8D2EVsLDBhj35EePVskvMA=",
      href: "/categories/pooja-thali",
    },
    {
      title: "Diyas & Lamps",
      image:
        "https://plus.unsplash.com/premium_photo-1674992166124-94ebd434fb0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGl5YXMlMjBhbmQlMjBsYW1wc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/categories/diyas",
    },
    {
      title: "Incense & Dhoop",
      image:
        "https://plus.unsplash.com/premium_photo-1736517212370-e3a9cfdc22c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW5jZW5zZSUyMCUyNiUyMERob29wfGVufDB8fDB8fHww",
      href: "/categories/incense",
    },
  ];

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
              <Link key={index} to={category.href} className="group">
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

        {/* Special Offers */}
        <section className="my-12 py-10 px-6 bg-primary/5 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Special Offers</h2>
            <p className="text-muted-foreground">
              Limited time deals on premium puja items
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialOffers.map((product) => (
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
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/offers" className="flex items-center">
                View All Offers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Products */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
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
