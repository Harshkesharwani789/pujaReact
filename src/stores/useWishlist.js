import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlist = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (!existingItem) {
          set({ items: [...currentItems, item] });
        }
      },

      removeFromWishlist: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);

export default useWishlist;
