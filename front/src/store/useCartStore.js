import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (producto) =>
    set((state) => ({
      cart: [...state.cart, producto],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));

export default useCartStore;
