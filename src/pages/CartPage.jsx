"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Truck,
} from "lucide-react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import useCart from "../stores/useCart";
import useToast from "../hooks/useToast";
import ProductCard from "../components/ProductCard";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } =
    useCart();
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: `${title} has been removed from your cart.`,
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
      });
      return;
    }

    // Simulate coupon validation
    if (couponCode.toUpperCase() === "DIWALI20") {
      const discountAmount = Math.round(getTotal() * 0.2);
      setDiscount(discountAmount);
      setCouponApplied(true);
      toast({
        title: "Coupon applied",
        description: "20% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
      });
    }
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment gateway...",
    });
    // In a real app, this would redirect to checkout
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 1500);
  };

  if (!mounted) {
    return null; // Prevent hydration errors
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-12">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
              <Link to="/categories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <div className="grid gap-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid gap-4 grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr]"
                    >
                      <div className="aspect-square overflow-hidden rounded-md">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemove(item.id, item.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  Number.parseInt(e.target.value)
                                )
                              }
                              className="h-8 w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                          <div className="font-medium">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/categories">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant="outline" onClick={() => clearCart()}>
                Clear Cart
              </Button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <ProductCard
                  id="25"
                  title="Silver Nandi Idol"
                  price={1499}
                  image="/placeholder.svg"
                  category="Idols & Statues"
                  rating={4.7}
                />
                <ProductCard
                  id="26"
                  title="Brass Bell"
                  price={699}
                  image="/placeholder.svg"
                  category="Puja Accessories"
                  rating={4.8}
                />
                <ProductCard
                  id="27"
                  title="Copper Kalash"
                  price={899}
                  image="/placeholder.svg"
                  category="Puja Accessories"
                  rating={4.6}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border bg-card p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getTotal().toLocaleString()}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{getTotal() > 1000 ? "Free" : "₹99"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>₹{Math.round(getTotal() * 0.18).toLocaleString()}</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    ₹
                    {Math.round(
                      getTotal() * 1.18 -
                        discount +
                        (getTotal() > 1000 ? 0 : 99)
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="pt-4">
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied}
                    >
                      Apply
                    </Button>
                  </div>

                  {couponApplied && (
                    <div className="bg-green-50 text-green-700 p-2 rounded text-sm mb-4">
                      Coupon "DIWALI20" applied successfully!
                    </div>
                  )}

                  <Button
                    className="w-full mb-3"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-1 mb-2">
                      <Truck className="h-4 w-4" />
                      Free shipping on orders above ₹1000
                    </p>
                    <p>Secure payment processing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
