export type Shirt = {
  id: number;  
  name: string;
  price: number;
  sizes: string[];
  colors: string[];
}

export const Shirts: Shirt[] = [
  { id: 1, name: "Camiseta Oversized", sizes: ["P", "M", "G"], colors: ["red", "blue", "orange"], price: 19.99 },
  { id: 2, name: "Camiseta Básica", sizes: ["M", "G"], colors: ["orange"], price: 9.99 },
  { id: 3, name: "Camiseta Simples", sizes: ["P"], colors: ["blue", "red"], price: 4.99 },
  { id: 4, name: "Camiseta OutCast", sizes: ["G"], colors: ["blue", "orange"], price: 14.99 },
  { id: 5, name: "Camiseta Unisex", sizes: ["P", "G"], colors: ["red"], price: 24.99 },
]
