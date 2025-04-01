"use client";

import { useState } from "react";
import { Search, Filter, Mail, Eye } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../components/ui/Button";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Mock data
  const customers = [
    {
      id: 1,
      name: "Rajesh Sharma",
      email: "rajesh@example.com",
      orders: 12,
      spent: "₹15,450",
      status: "Active",
      joined: "2022-05-15",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      orders: 8,
      spent: "₹9,850",
      status: "Active",
      joined: "2022-07-22",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      orders: 15,
      spent: "₹22,300",
      status: "Active",
      joined: "2021-11-10",
    },
    {
      id: 4,
      name: "Sunita Gupta",
      email: "sunita@example.com",
      orders: 5,
      spent: "₹6,100",
      status: "Inactive",
      joined: "2023-01-05",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@example.com",
      orders: 10,
      spent: "₹12,700",
      status: "Active",
      joined: "2022-03-18",
    },
    {
      id: 6,
      name: "Neha Sharma",
      email: "neha@example.com",
      orders: 7,
      spent: "₹8,950",
      status: "Active",
      joined: "2022-09-30",
    },
    {
      id: 7,
      name: "Rahul Verma",
      email: "rahul@example.com",
      orders: 3,
      spent: "₹4,500",
      status: "Inactive",
      joined: "2023-02-14",
    },
    {
      id: 8,
      name: "Ananya Patel",
      email: "ananya@example.com",
      orders: 9,
      spent: "₹11,200",
      status: "Active",
      joined: "2022-06-08",
    },
    {
      id: 9,
      name: "Kiran Joshi",
      email: "kiran@example.com",
      orders: 6,
      spent: "₹7,750",
      status: "Active",
      joined: "2022-08-22",
    },
    {
      id: 10,
      name: "Deepak Gupta",
      email: "deepak@example.com",
      orders: 2,
      spent: "₹2,900",
      status: "Inactive",
      joined: "2023-03-05",
    },
  ];

  const statuses = ["All", "Active", "Inactive"];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-gray-600">Manage your customer base</p>
        </div>
        <Button className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          Send Email
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
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
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
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {customer.spent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(customer.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Eye className="h-4 w-4" />
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
              <span className="font-medium">{filteredCustomers.length}</span> of{" "}
              <span className="font-medium">{customers.length}</span> customers
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
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;
