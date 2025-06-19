import { WishlistItem } from "./wishlist-item.model";

export interface Wishlist {
  user: string;
  items: WishlistItem[];
  totalItems: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}