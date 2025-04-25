import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        if (!item.id) {
          item.id = uuidv4(); // 🔁 assign unique ID if missing
        }

        console.log("Adding item to cart:", item);

        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          });
        } else {
          set({
            items: [...currentItems, { ...item, quantity: item.quantity || 1 }],
          });
        }

        console.log("Cart after update:", get().items);
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          // Optional: remove item if quantity is 0 or less
          get().removeFromCart(id);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        const items = get().items || [];
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotal: () => {
        const items = get().items || [];
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true, // optional if using Next.js to avoid hydration mismatch
    }
  )
);

export default useCart;
