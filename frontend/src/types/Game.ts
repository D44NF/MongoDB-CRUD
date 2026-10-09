export interface Game {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  owned: boolean;
  imageUrl?: string | null;
}
