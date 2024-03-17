import { create } from "zustand";
import { ProductStoreType, ProductType } from "../types/Product.type";

const useProduct = create<ProductStoreType>((set) => ({
  loading: false,
  products: [],
  error: null,
  getProducts: async () => {
    try {
      set(() => ({
        loading: true,
      }));
      const res = await fetch(
        "https://65f3d0ff105614e654a13150.mockapi.io/products"
      );
      const data = await res.json();
      set(() => ({
        loading: false,
        products: data,
        error: null,
      }));
    } catch (err) {
      set(() => ({
        loading: false,
      }));
    }
  },
  deleteProduct: async (id: number) => {
    try {
      set(() => ({
        loading: true,
      }));
      await fetch(
        `https://65f3d0ff105614e654a13150.mockapi.io/products/${id}`,
        {
          method: "DELETE",
        }
      );
      set((state) => ({
        loading: false,
        products: state.products.filter((product) => product.id !== id),
        error: null,
      }));
    } catch (err) {
      set(() => ({
        loading: false,
      }));
    }
  },
  updateProduct: async (updatedProduct: ProductType) => {
    try {
      set(() => ({
        loading: true,
      }));
      await fetch(
        `https://65f3d0ff105614e654a13150.mockapi.io/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      set((state) => ({
        loading: false,
        products: state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        ),
        error: null,
      }));
    } catch (err) {
      set(() => ({
        loading: false,
      }));
    }
  },
}));

export default useProduct;
