import { Category } from './category.type';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
}

export interface CreateProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: number;
}
