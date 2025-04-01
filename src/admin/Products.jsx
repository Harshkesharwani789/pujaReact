"use client";

import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../components/ui/Button";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock data
  const products = [
    {
      id: "PRD-123",
      name: "Brass Ganesh Idol",
      category: "Idols & Statues",
      price: 1299,
      stock: 25,
      image:
        "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=100&auto=format&fit=crop",
      featured: true,
      specialOffer: false,
    },
    {
      id: "PRD-124",
      name: "Silver Pooja Thali Set",
      category: "Pooja Thali Sets",
      price: 2499,
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=100&auto=format&fit=crop",
      featured: true,
      specialOffer: false,
    },
    {
      id: "PRD-125",
      name: "Decorative Diya Set",
      category: "Diyas & Lamps",
      price: 599,
      stock: 42,
      image:
        "https://images.unsplash.com/photo-1635321593217-40050ad13c74?q=80&w=100&auto=format&fit=crop",
      featured: false,
      specialOffer: false,
    },
    {
      id: "PRD-126",
      name: "Sandalwood Incense Sticks",
      category: "Incense & Dhoop",
      price: 199,
      stock: 85,
      image:
        "https://images.unsplash.com/photo-1518332438835-7dad57dcea5f?q=80&w=100&auto=format&fit=crop",
      featured: false,
      specialOffer: false,
    },
    {
      id: "PRD-127",
      name: "Marble Lakshmi Idol",
      category: "Idols & Statues",
      price: 1899,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1626196340145-e7c1b9e9fbf7?q=80&w=100&auto=format&fit=crop",
      featured: false,
      specialOffer: true,
      discountPrice: 1599,
    },
    {
      id: "PRD-128",
      name: "Copper Kalash Set",
      category: "Puja Accessories",
      price: 1899,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1600255821058-c4f89958d155?q=80&w=100&auto=format&fit=crop",
      featured: false,
      specialOffer: false,
    },
    {
      id: "PRD-129",
      name: "Handcrafted Bell",
      category: "Puja Accessories",
      price: 799,
      stock: 30,
      image:
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=100&auto=format&fit=crop",
      featured: false,
      specialOffer: false,
    },
    {
      id: "PRD-130",
      name: "Rudraksha Mala",
      category: "Spiritual Jewelry",
      price: 499,
      stock: 22,
      image:
        "https://images.unsplash.com/photo-1611252871536-5f1b1a646756?q=80&w=100&auto=format&fit=crop",
      featured: false,
      specialOffer: false,
    },
  ];

  const categories = [
    "All",
    "Idols & Statues",
    "Pooja Thali Sets",
    "Diyas & Lamps",
    "Incense & Dhoop",
    "Puja Accessories",
    "Spiritual Jewelry",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.specialOffer && product.discountPrice ? (
                        <div>
                          <span className="font-medium">
                            ₹{product.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-xs line-through text-gray-500 ml-2">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span>₹{product.price.toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock > 20
                          ? "bg-green-100 text-green-800"
                          : product.stock > 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.featured && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                      {product.specialOffer && (
                        <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                          Special Offer
                        </span>
                      )}
                      {!product.featured && !product.specialOffer && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          Regular
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredProducts.length}</span> of{" "}
              <span className="font-medium">{products.length}</span> products
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md bg-primary text-white">
                1
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
