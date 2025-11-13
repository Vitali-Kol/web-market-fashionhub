import type { Product } from "../context/CartContext";

export const sampleProducts: Product[] = [
  {
    id: "m-shirt-1",
    name: "KLASSIKALINE VALGE T-SÄRK",
    price: 19.99,
    image: "icon/white_t_shirt.png",
    category: "mees",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "m-shirt-2",
    name: "VALGE POLOSÄRK",
    price: 29.99,
    image: "icon/white_polo.png",
    category: "mees",
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    id: "m-pants-1",
    name: "SINISED TEKSAD",
    price: 49.99,
    image: "icon/blue_jeans.png",
    category: "mees",
    availableSizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "m-jacket-1",
    name: "NAHKTAGI",
    price: 129.99,
    image: "icon/leather_jacket.png",
    category: "mees",
    availableSizes: ["M", "L", "XL"],
  },
  {
    id: "w-dress-1",
    name: "SUVELOORITRÜKKIGA KLEIT",
    price: 59.99,
    image: "icon/kleit.png",
    category: "naiste",
    availableSizes: ["XS", "S", "M", "L"],
  },
  {
    id: "w-top-1",
    name: "ELEGANTNE PLUUS",
    price: 39.99,
    image: "icon/bluzka.png",
    category: "naiste",
    availableSizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "w-pants-1",
    name: "KÕRGE VÖÖKOHA PÜKSID",
    price: 44.99,
    image: "icon/puksid.png",
    category: "naiste",
    availableSizes: ["XS", "S", "M", "L"],
  },
  {
    id: "w-jacket-1",
    name: "DENIM-TAGI",
    price: 69.99,
    image: "icon/denim.png",
    category: "naiste",
    availableSizes: ["S", "M", "L"],
  },
];

export function getProductsByCategory(category: string): Product[] {
  return sampleProducts.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return sampleProducts.find((product) => product.id === id);
}
