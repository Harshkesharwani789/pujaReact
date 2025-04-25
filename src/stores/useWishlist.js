import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid"; // ✅ for unique ID fallback

const useWishlist = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        if (!item.id) {
          item.id = uuidv4(); // ✅ assign unique ID if missing
          console.warn("Item had no ID. Assigned new ID:", item.id);
        }

        console.log("Adding item to wishlist:", item);

        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (!existingItem) {
          set({ items: [...currentItems, item] });
          console.log("Item added to wishlist.");
        } else {
          console.log("Item already in wishlist.");
        }

        console.log("Wishlist after update:", get().items);
      },

      removeFromWishlist: (id) => {
        console.log("Removing item with id:", id);
        set({ items: get().items.filter((item) => item.id !== id) });
        console.log("Wishlist after removal:", get().items);
      },

      isInWishlist: (id) => {
        const result = get().items.some((item) => item.id === id);
        console.log(`Is item with id "${id}" in wishlist?`, result);
        return result;
      },

      clearWishlist: () => {
        console.log("Clearing wishlist...");
        set({ items: [] });
        console.log("Wishlist cleared.");
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);

export default useWishlist;
