// Updated Categories.jsx with edit functionality and image upload from desktop

"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../components/ui/Button";
import axios from "axios";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editCategoryId, setEditCategoryId] = useState(null);

  const API_URL = "https://pujabackend.onrender.com/api/categories";
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL, config);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setNewCategory({ ...newCategory, image: e.target.files[0] });
  };

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("description", newCategory.description);
      formData.append("image", newCategory.image);

      await axios.post(API_URL, formData, {
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      setShowAddModal(false);
      setNewCategory({ name: "", description: "", image: null });
      fetchCategories();
    } catch (err) {
      console.error("Add category failed:", err.response?.data || err);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategoryId(category._id);
    setNewCategory({
      name: category.name,
      description: category.description,
      image: null,
    });
    setShowEditModal(true);
  };

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("description", newCategory.description);
      if (newCategory.image) {
        formData.append("image", newCategory.image);
      }

      await axios.put(`${API_URL}/${editCategoryId}`, formData, {
        headers: {
          ...config.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      setShowEditModal(false);
      setNewCategory({ name: "", description: "", image: null });
      fetchCategories();
    } catch (err) {
      console.error("Update category failed:", err.response?.data || err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, config);
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCategoryModal = (isEdit = false) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Category" : "Add New Category"}
        </h2>
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
              Image File
            </label>
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={isEdit ? handleUpdateCategory : handleAddCategory}>
            {isEdit ? "Update Category" : "Add Category"}
          </Button>
        </div>
      </div>
    </div>
  );

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
          <Plus className="h-4 w-4 mr-2" /> Add Category
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
              className="pl-10 pr-4 py-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
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
                      <span className="font-medium">
                        {category.products?.length || 0}
                      </span>{" "}
                      products
                    </p>
                  </div>
                  <div className="flex">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
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

      {showAddModal && renderCategoryModal(false)}
      {showEditModal && renderCategoryModal(true)}
    </AdminLayout>
  );
};

export default Categories;
