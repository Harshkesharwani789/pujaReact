"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Button from "./ui/Button";

const MobileMenu = ({ onClose }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    {
      name: "Idols & Statues",
      subcategories: [
        "Ganesh",
        "Lakshmi",
        "Shiva",
        "Krishna",
        "Durga",
        "Buddha",
      ],
    },
    {
      name: "Pooja Thali Sets",
      subcategories: ["Silver", "Brass", "Copper", "German Silver"],
    },
    {
      name: "Diyas & Lamps",
      subcategories: [
        "Brass Diyas",
        "Silver Diyas",
        "Decorative Lamps",
        "LED Diyas",
      ],
    },
    {
      name: "Incense & Dhoop",
      subcategories: ["Incense Sticks", "Dhoop Cones", "Loban", "Camphor"],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <nav className="flex flex-col">
            <Link
              to="/"
              className="px-4 py-3 border-b hover:bg-muted"
              onClick={onClose}
            >
              Home
            </Link>

            {categories.map((category, index) => (
              <div key={index}>
                <button
                  className="w-full px-4 py-3 border-b hover:bg-muted flex justify-between items-center"
                  onClick={() =>
                    setOpenCategory(openCategory === index ? null : index)
                  }
                >
                  {category.name}
                  <span>{openCategory === index ? "−" : "+"}</span>
                </button>

                {openCategory === index && (
                  <div className="bg-muted/50">
                    {category.subcategories.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={`/categories/${category.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/&/g, "")}`}
                        className="block px-8 py-2 text-sm hover:bg-muted"
                        onClick={onClose}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/offers"
              className="px-4 py-3 border-b hover:bg-muted"
              onClick={onClose}
            >
              Special Offers
            </Link>

            <Link
              to="/about"
              className="px-4 py-3 border-b hover:bg-muted"
              onClick={onClose}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="px-4 py-3 border-b hover:bg-muted"
              onClick={onClose}
            >
              Contact Us
            </Link>

            <Link
              to="/faq"
              className="px-4 py-3 border-b hover:bg-muted"
              onClick={onClose}
            >
              FAQ
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-3">
            <Button
              asChild
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="w-full" onClick={onClose}>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
