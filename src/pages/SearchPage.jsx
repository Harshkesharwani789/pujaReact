"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Search } from "lucide-react";

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);

  // Sample data
  const allProducts = [
    {
      id: "1",
      title: "Brass Ganesh Idol",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=300&auto=format&fit=crop",
      category: "Idols & Statues",
      rating: 4.9,
    },
    {
      id: "2",
      title: "Silver Pooja Thali Set",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=300&auto=format&fit=crop",
      category: "Pooja Thali Sets",
      rating: 4.7,
    },
    {
      id: "3",
      title: "Decorative Diya Set",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1635321593217-40050ad13c74?q=80&w=300&auto=format&fit=crop",
      category: "Diyas & Lamps",
      rating: 4.5,
    },
    {
      id: "4",
      title: "Sandalwood Incense Sticks",
      price: 199,
      image: "/placeholder.svg",
      category: "Incense & Dhoop",
      rating: 4.8,
    },
    {
      id: "5",
      title: "Marble Lakshmi Idol",
      price: 1899,
      discountPrice: 1599,
      image: "/placeholder.svg",
      category: "Idols & Statues",
      rating: 4.8,
      badge: "15% OFF",
    },
    // More products...
  ];

  useEffect(() => {
    if (query) {
      // Filter products based on search query
      const results = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would update the URL with the new search query
    window.history.pushState(
      {},
      "",
      `/search?q=${encodeURIComponent(searchQuery)}`
    );

    // Filter products based on new search query
    const results = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex max-w-lg">
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        {query && (
          <p className="mb-6 text-muted-foreground">
            {searchResults.length === 0
              ? `No results found for "${query}"`
              : `Showing ${searchResults.length} results for "${query}"`}
          </p>
        )}

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
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
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <h2 className="text-xl font-medium mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              Try searching with different keywords or browse our categories
            </p>
            <Button asChild>
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
