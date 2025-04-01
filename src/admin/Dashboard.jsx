import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Image,
  Tag,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Sales",
      value: "₹1,24,500",
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      change: "+12.5%",
    },
    {
      title: "Orders",
      value: "156",
      icon: <ShoppingCart className="h-8 w-8 text-blue-500" />,
      change: "+8.2%",
    },
    {
      title: "Products",
      value: "248",
      icon: <Package className="h-8 w-8 text-purple-500" />,
      change: "+3.1%",
    },
    {
      title: "Customers",
      value: "1,240",
      icon: <Users className="h-8 w-8 text-orange-500" />,
      change: "+15.3%",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-5123",
      customer: "Rajesh Sharma",
      date: "2023-10-15",
      status: "Delivered",
      amount: "₹2,450",
    },
    {
      id: "ORD-5122",
      customer: "Priya Patel",
      date: "2023-10-14",
      status: "Processing",
      amount: "₹1,850",
    },
    {
      id: "ORD-5121",
      customer: "Amit Kumar",
      date: "2023-10-14",
      status: "Shipped",
      amount: "₹3,200",
    },
    {
      id: "ORD-5120",
      customer: "Sunita Gupta",
      date: "2023-10-13",
      status: "Delivered",
      amount: "₹1,100",
    },
    {
      id: "ORD-5119",
      customer: "Vikram Singh",
      date: "2023-10-13",
      status: "Cancelled",
      amount: "₹2,700",
    },
  ];

  const lowStockItems = [
    {
      id: "PRD-123",
      name: "Brass Ganesh Idol",
      stock: 3,
      category: "Idols & Statues",
    },
    {
      id: "PRD-145",
      name: "Silver Pooja Thali",
      stock: 2,
      category: "Pooja Thali Sets",
    },
    {
      id: "PRD-167",
      name: "Decorative Diya Set",
      stock: 5,
      category: "Diyas & Lamps",
    },
  ];

  const quickLinks = [
    {
      title: "Add New Product",
      icon: <Package className="h-5 w-5" />,
      link: "/admin/products/new",
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Manage Categories",
      icon: <Tag className="h-5 w-5" />,
      link: "/admin/categories",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Update Banners",
      icon: <Image className="h-5 w-5" />,
      link: "/admin/banners",
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Special Offers",
      icon: <Tag className="h-5 w-5" />,
      link: "/admin/offers",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickLinks.map((link, index) => (
          <Link key={index} to={link.link} className="block">
            <div
              className={`p-4 rounded-lg ${link.color} hover:opacity-90 transition-opacity`}
            >
              <div className="flex items-center">
                <div className="mr-3">{link.icon}</div>
                <h3 className="font-medium">{link.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm">
                    {stat.change} from last month
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-primary text-sm hover:underline"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {order.customer}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {order.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              <h2 className="text-lg font-semibold">Low Stock Alert</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {lowStockItems.map((item) => (
                <li key={item.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-500 font-medium">
                        {item.stock} left
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                to="/admin/products"
                className="text-primary text-sm hover:underline"
              >
                Manage Inventory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
