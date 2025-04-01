"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../components/ui/Button";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  // Mock data
  const categories = [
    {
      id: 1,
      name: "Idols & Statues",
      description: "Deities and religious statues for worship and decoration",
      image:
        "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=100&auto=format&fit=crop",
      products: 42,
    },
    {
      id: 2,
      name: "Pooja Thali Sets",
      description: "Complete sets for daily rituals and special occasions",
      image:
        "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=100&auto=format&fit=crop",
      products: 28,
    },
    {
      id: 3,
      name: "Diyas & Lamps",
      description:
        "Traditional and decorative lamps for festivals and daily use",
      image:
        "https://images.unsplash.com/photo-1635321593217-40050ad13c74?q=80&w=100&auto=format&fit=crop",
      products: 35,
    },
    {
      id: 4,
      name: "Incense & Dhoop",
      description: "Aromatic sticks and cones for purification and meditation",
      image:
        "https://images.unsplash.com/photo-1518332438835-7dad57dcea5f?q=80&w=100&auto=format&fit=crop",
      products: 19,
    },
    {
      id: 5,
      name: "Puja Accessories",
      description: "Essential items for daily worship and rituals",
      image:
        "https://images.unsplash.com/photo-1600255821058-c4f89958d155?q=80&w=100&auto=format&fit=crop",
      products: 31,
    },
    {
      id: 6,
      name: "Spiritual Jewelry",
      description: "Sacred ornaments with religious significance",
      image:
        "https://images.unsplash.com/photo-1611252871536-5f1b1a646756?q=80&w=100&auto=format&fit=crop",
      products: 15,
    },
    {
      id: 7,
      name: "Diwali Special",
      description: "Festive items for Diwali celebration",
      image:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=100&auto=format&fit=crop",
      products: 24,
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    // In a real app, this would send data to an API
    setShowAddModal(false);
    alert(`Category "${newCategory.name}" would be added to the database`);
    setNewCategory({ name: "", description: "", image: "" });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-600">Manage product categories</p>
        </div>
        <Button
          className="flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="border rounded-lg overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {category.description}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">{category.products}</span>{" "}
                      products
                    </p>
                  </div>
                  <div className="flex">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No categories found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newCategory.image}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, image: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Categories;
