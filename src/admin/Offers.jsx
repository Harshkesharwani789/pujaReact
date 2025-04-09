"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Tag, Percent } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../components/ui/Button";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [offerType, setOfferType] = useState("discount");
  const [newOffer, setNewOffer] = useState({
    title: "",
    type: "discount",
    discount: 0,
    startDate: "",
    endDate: "",
    products: 0,
    status: "active",
  });
  const [editOffer, setEditOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          "https://pujabackend.onrender.com/api/offers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOfferTypeIcon = (type) => {
    switch (type) {
      case "discount":
        return <Percent className="h-4 w-4 text-orange-500" />;
      case "bogo":
        return <Tag className="h-4 w-4 text-purple-500" />;
      case "bundle":
        return <Tag className="h-4 w-4 text-blue-500" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const handleAddOffer = async () => {
    try {
      const response = await fetch(
        "https://pujabackend.onrender.com/api/offers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOffer),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOffers([...offers, data]);
      setShowAddModal(false);
      setNewOffer({
        title: "",
        type: "discount",
        discount: 0,
        startDate: "",
        endDate: "",
        products: 0,
        status: "active",
      });
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

  const handleEditOffer = async (offer) => {
    try {
      const response = await fetch(
        `https://pujabackend.onrender.com/api/offers/${offer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offer),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedOffer = await response.json();
      setOffers(
        offers.map((o) => (o._id === updatedOffer._id ? updatedOffer : o))
      );
      setEditOffer(null);
    } catch (error) {
      console.error("Error editing offer:", error);
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      const response = await fetch(
        `https://pujabackend.onrender.com/api/offers/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setOffers(offers.filter((offer) => offer._id !== id));
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Special Offers</h1>
          <p className="text-gray-600">
            Manage discounts, bundles, and promotions
          </p>
        </div>
        <Button
          className="flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Offer
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
              placeholder="Search offers..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Offer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
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
              {filteredOffers.map((offer) => (
                <tr key={offer._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {offer.title}
                    </div>
                    {offer.type === "discount" && (
                      <div className="text-sm text-gray-500">
                        {offer.discount}% off
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getOfferTypeIcon(offer.type)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">
                        {offer.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(offer.startDate).toLocaleDateString()} -{" "}
                      {new Date(offer.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {offer.products}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        offer.status
                      )}`}
                    >
                      {offer.status.charAt(0).toUpperCase() +
                        offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditOffer(offer)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No offers found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Add Offer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Offer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newOffer.title}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Type
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newOffer.type}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, type: e.target.value })
                  }
                >
                  <option value="discount">Discount</option>
                  <option value="bogo">Buy One Get One</option>
                  <option value="bundle">Bundle</option>
                </select>
              </div>

              {newOffer.type === "discount" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md"
                    min="1"
                    max="100"
                    value={newOffer.discount}
                    onChange={(e) =>
                      setNewOffer({
                        ...newOffer,
                        discount: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newOffer.startDate}
                    onChange={(e) =>
                      setNewOffer({
                        ...newOffer,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newOffer.endDate}
                    onChange={(e) =>
                      setNewOffer({ ...newOffer, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Products
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newOffer.products}
                  onChange={(e) =>
                    setNewOffer({
                      ...newOffer,
                      products: parseInt(e.target.value, 10),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddOffer}>Add Offer</Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Offer Modal */}
      {editOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Offer</h2>
            {/* ... (Edit form similar to Add Offer form, but pre-filled with editOffer data) ... */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditOffer(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleEditOffer(editOffer)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Offers;
