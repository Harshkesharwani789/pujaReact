"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Move, Eye } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../components/ui/Button";

const Banners = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewBanner, setPreviewBanner] = useState(null);

  // Mock data
  const banners = [
    {
      id: 1,
      title: "Diwali Special Collection",
      description:
        "Discover our exclusive range of premium puja items and decorations for this festive season.",
      image:
        "https://images.unsplash.com/photo-1604423481263-4cbc0cb7ea6c?q=80&w=300&auto=format&fit=crop",
      buttonText: "Shop Now",
      buttonLink: "/categories/diwali",
      active: true,
      position: 1,
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest collection of brass and silver items.",
      image:
        "https://images.unsplash.com/photo-1600255821058-c4f89958d155?q=80&w=300&auto=format&fit=crop",
      buttonText: "Explore",
      buttonLink: "/new-arrivals",
      active: false,
      position: 2,
    },
    {
      id: 3,
      title: "Pooja Essentials",
      description:
        "Everything you need for your daily rituals and special occasions.",
      image:
        "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=300&auto=format&fit=crop",
      buttonText: "View Collection",
      buttonLink: "/categories/pooja-thali",
      active: false,
      position: 3,
    },
  ];

  const handlePreview = (banner) => {
    setPreviewBanner(banner);
    setShowPreview(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Banners</h1>
          <p className="text-gray-600">
            Manage homepage banners and promotional content
          </p>
        </div>
        <Button
          className="flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Active Banners</h2>
          <p className="text-sm text-gray-600">
            Drag and drop to reorder. Only active banners are displayed on the
            website.
          </p>
        </div>

        <div className="p-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`mb-4 border rounded-lg overflow-hidden ${
                banner.active ? "border-green-500" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 overflow-hidden">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {banner.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {banner.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Move"
                        >
                          <Move className="h-4 w-4 text-gray-500" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Preview"
                          onClick={() => handlePreview(banner)}
                        >
                          <Eye className="h-4 w-4 text-blue-500" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-indigo-500" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm">Button: </span>
                      <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                        {banner.buttonText}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        → {banner.buttonLink}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          banner.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {banner.active ? "Active" : "Inactive"}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        Position: {banner.position}
                      </span>
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={banner.active}
                          readOnly
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        <span className="ms-3 text-sm font-medium text-gray-700">
                          {banner.active ? "Enabled" : "Disabled"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Add New Banner</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Image
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded-l-md"
                    placeholder="Image URL"
                  />
                  <button className="px-4 py-2 bg-gray-100 border border-l-0 rounded-r-md">
                    Upload
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1200x400 pixels
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Link
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="active"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Set as active
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddModal(false)}>Add Banner</Button>
            </div>
          </div>
        </div>
      )}

      {/* Banner Preview Modal */}
      {showPreview && previewBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl">
            <div className="relative">
              <img
                src={previewBanner.image || "/placeholder.svg"}
                alt={previewBanner.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {previewBanner.title}
                </h2>
                <p className="mb-4">{previewBanner.description}</p>
                <button className="px-4 py-2 bg-white text-primary rounded-md font-medium">
                  {previewBanner.buttonText}
                </button>
              </div>
            </div>
            <div className="p-4 flex justify-end">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Banners;
