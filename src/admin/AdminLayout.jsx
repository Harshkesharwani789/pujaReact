"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Tag,
  Image,
  Percent,
} from "lucide-react";
import useAuth from "../stores/useAuth";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Products",
      path: "/admin/products",
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: "Categories",
      path: "/admin/categories",
    },
    {
      icon: <Percent className="h-5 w-5" />,
      label: "Special Offers",
      path: "/admin/offers",
    },
    {
      icon: <Image className="h-5 w-5" />,
      label: "Banners",
      path: "/admin/banners",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Orders",
      path: "/admin/orders",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Customers",
      path: "/admin/customers",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <span className="ml-3 text-xl font-bold text-primary">
            PujaStore Admin
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-6">
          <Link to="/admin" className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <span className="ml-3 text-xl font-bold text-primary">
              PujaStore Admin
            </span>
          </Link>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-md ${
                    location.pathname === item.path
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-md hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="pt-16 lg:pt-0 min-h-screen">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
