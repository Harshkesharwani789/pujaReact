"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";

const AddOrEditProduct = () => {
  const { id } = useParams(); // Product ID (if editing)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Load categories, product (if editing), and all products
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://pujabackend.onrender.com/api/categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await fetch(
          `https://pujabackend.onrender.com/api/products/${id}`
        );
        const product = await res.json();
        setFormData({
          name: product.name,
          price: product.price,
          stock: product.stock,
          category: product.category,
        });
      } catch (err) {
        toast.error("Failed to load product");
      }
    };

    const fetchAllProducts = async () => {
      try {
        const res = await fetch(
          "https://pujabackend.onrender.com/api/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchCategories();
    fetchProduct();
    fetchAllProducts();
  }, [id]);

  const refreshProducts = async () => {
    try {
      const res = await fetch("https://pujabackend.onrender.com/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to refresh products", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImages(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const res = await fetch(
        id
          ? `https://pujabackend.onrender.com/api/products/${id}`
          : "https://pujabackend.onrender.com/api/products",
        {
          method: id ? "PUT" : "POST",
          body: data,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(id ? "Product updated" : "Product added");
      navigate("/admin/products");
      await refreshProducts();
    } catch (err) {
      console.log("Form error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(
        `https://pujabackend.onrender.com/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success("Product deleted");
      await refreshProducts();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="w-full p-2 border rounded"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            className="w-full p-2 border rounded"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {id ? "Update" : "Add"} Product
          </button>
        </form>
      </div>

      {/* Products List */}
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <h3 className="text-xl font-bold mb-4">All Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-sm flex flex-col gap-2"
            >
              <img
                src={product.images?.[0]?.url || ""}
                alt={product.name}
                className="h-40 object-cover rounded"
              />
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <p>₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>
                Category:{" "}
                {categories.find((c) => c._id === product.category)?.name ||
                  "Unknown"}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/admin/products/${product._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddOrEditProduct;
