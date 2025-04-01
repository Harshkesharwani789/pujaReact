"use client";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import Button from "../components/ui/Button";

const CategoryPage = () => {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Sample data
  const products = {
    idols: [
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
      // More products...
    ],
    "pooja-thali": [
      {
        id: "2",
        title: "Silver Pooja Thali Set",
        price: 2499,
        image:
          "https://plus.unsplash.com/premium_photo-1675053533678-615611ecc0b0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2lsdmVyJTIwcG9vamElMjB0aGFsaSUyMHNldHxlbnwwfHwwfHx8MA%3D%3D",
        category: "Pooja Thali Sets",
        rating: 4.7,
      },
      // More products...
    ],
    diyas: [
      {
        id: "3",
        title: "Decorative Diya Set",
        price: 599,
        image:
          "https://images.unsplash.com/photo-1605302977593-fe0329b1effd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVjb3JhdGl2ZSUyMGRpeWElMjBzZXR8ZW58MHx8MHx8fDA%3D",
        category: "Diyas & Lamps",
        rating: 4.5,
      },
      // More products...
    ],
    incense: [
      {
        id: "4",
        title: "Sandalwood Incense Sticks",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1611800065908-233b597db552?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FuZGFsd29vZCUyMEluY2Vuc2UlMjBTdGlja3N8ZW58MHx8MHx8fDA%3D",
        category: "Incense & Dhoop",
        rating: 4.8,
      },
      // More products...
    ],
  };

  const categoryTitles = {
    idols: "Idols & Statues",
    "pooja-thali": "Pooja Thali Sets",
    diyas: "Diyas & Lamps",
    incense: "Incense & Dhoop",
    diwali: "Diwali Special Collection",
  };

  useEffect(() => {
    const categoryProducts = products[category] || [];
    setAllProducts(categoryProducts);
    setFilteredProducts(categoryProducts);
  }, [category]);

  const handleRatingChange = (rating, checked) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    }
  };

  const applyFilters = () => {
    let result = [...allProducts];

    // Filter by price range
    result = result.filter((product) => {
      const price = product.discountPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by rating
    if (selectedRatings.length > 0) {
      result = result.filter((product) => {
        const rating = Math.floor(product.rating);
        return selectedRatings.includes(rating);
      });
    }

    // Sort products
    if (sortBy === "price-low-high") {
      result.sort(
        (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
      );
    } else if (sortBy === "price-high-low") {
      result.sort(
        (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
      );
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);

    // On mobile, close the filter panel after applying
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedRatings([]);
    setSortBy("featured");
    setFilteredProducts(allProducts);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-primary">
              Categories
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {categoryTitles[category] || "Products"}
            </span>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-3xl font-bold">
              {categoryTitles[category] || "Products"}
            </h1>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? (
                  <X className="h-4 w-4 mr-2" />
                ) : (
                  <Filter className="h-4 w-4 mr-2" />
                )}
                {showFilters ? "Close" : "Filter"}
              </Button>

              <div className="hidden md:block">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setTimeout(applyFilters, 0);
                  }}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-background p-6 overflow-y-auto md:hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Number.parseInt(e.target.value),
                        ])
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onChange={(e) =>
                            handleRatingChange(rating, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center"
                        >
                          {Array.from({ length: rating }).map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-primary fill-primary"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                          <span className="ml-1">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={applyFilters} className="flex-1">
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="sticky top-20 space-y-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Number.parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`rating-desktop-${rating}`}
                            checked={selectedRatings.includes(rating)}
                            onChange={(e) =>
                              handleRatingChange(rating, e.target.checked)
                            }
                          />
                          <label
                            htmlFor={`rating-desktop-${rating}`}
                            className="flex items-center text-sm"
                          >
                            {Array.from({ length: rating }).map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4 text-primary fill-primary"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                            <span className="ml-1">& Up</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={applyFilters}
                      size="sm"
                      className="w-full mb-2"
                    >
                      Apply Filters
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetFilters}
                      className="w-full"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
