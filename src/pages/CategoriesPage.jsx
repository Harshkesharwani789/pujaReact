import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const CategoriesPage = () => {
  const categories = [
    {
      title: "Idols & Statues",
      image:
        "https://images.unsplash.com/photo-1590142588602-73354f46d6a0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGlkb2xzJTIwYW5kJTIwc3RhdHVlc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/categories/idols",
    },
    {
      title: "Pooja Thali Sets",
      image:
        "https://media.istockphoto.com/id/2168877442/photo/close-up-of-a-beautifully-decorated-pooja-thali-for-festival-celebration-to-worship.webp?a=1&b=1&s=612x612&w=0&k=20&c=2y8jgnE3dy7ZFapRX9Wni8D2EVsLDBhj35EePVskvMA=",
      href: "/categories/pooja-thali",
    },
    {
      title: "Diyas & Lamps",
      image:
        "https://plus.unsplash.com/premium_photo-1674992166124-94ebd434fb0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGl5YXMlMjBhbmQlMjBsYW1wc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/categories/diyas",
    },
    {
      title: "Incense & Dhoop",
      image:
        "https://plus.unsplash.com/premium_photo-1736517212370-e3a9cfdc22c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW5jZW5zZSUyMCUyNiUyMERob29wfGVufDB8fDB8fHww",
      href: "/categories/incense",
    },
    {
      title: "Diwali Special",
      image:
        "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGl3YWxpJTIwc3BlY2lhbHxlbnwwfHwwfHx8MA%3D%3D",
      href: "/categories/diwali",
    },
    {
      title: "Brass Items",
      image:
        "https://images.unsplash.com/photo-1590140114448-97f1da1b0257?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhc3MlMjBpdGVtc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/categories/brass",
    },
    {
      title: "Silver Items",
      image:
        "https://media.istockphoto.com/id/1296101172/photo/beautiful-carved-silver-pot-or-kalash-and-stand-used-in-hindu-rituals-on-blur-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=DlW7J-1Oy6QRHIJsnYvOX86UnsyW65Y3glghn11_69w=",
      href: "/categories/silver",
    },
    {
      title: "Puja Accessories",
      image:
        "https://media.istockphoto.com/id/2170557207/photo/turtle-figurine-bowl.webp?a=1&b=1&s=612x612&w=0&k=20&c=k35BtgyAAalb0pigIj2_CeTN1V79mL825uk7s3kAdmw=",
      href: "/categories/accessories",
    },
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Categories</span>
          </div>
          <h1 className="text-3xl font-bold">Shop by Category</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} to={category.href} className="group">
              <div className="relative overflow-hidden rounded-lg border bg-background hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
