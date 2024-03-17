export type ProductType = {
  id: number;
  title: string;
  price: number;
  avatar: string;
  category: string;
  description: string; // Changed property name from "level" to "level"
};

export type ProductStoreType = {
  loading: boolean;
  products: ProductType[]; // Corrected property name from "teacher" to "teachers"
  error: any;
  getProducts: () => void;
};

export type ProductInfo = {
  id: number;
  title: string;
  price: number;
  avatar: string;
  category: string;
  description: string; // Changed property name from "level" to "level"
};
