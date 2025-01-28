export type Product = {
  id: number;
  name: string;
  id_name: string;
  inStock: boolean;
  gallery: string[];
  attributes: Attribute[];
  price: Price;
  img: string;
};

export type Attribute = {
  id: number;
  name: string;
  id_name: string;
  type: string;
  items: Item[];
};

export type Price = {
  id: Number;
  amount: number;
  currency: Currency;
};

export type Currency = {
  label: string;
  symbol: string;
};

export type CartProduct = {
  id: string;
  name: string;
  quantity: Number;
  price: Price;
  itemTotal: any;
  items: any[];
  gallery: string[];
  attributes: Attribute[];
};

export type CurrentProduct = {
  quantity: number;
  id: Number | string;
  name: string;
  id_name: string;
  category: Category;
  gallery: string[];
  price: Price;
  items: Item[] | any;
  attributes: Attribute[];
};
export type CartItem = {
  id: string;
  name: string;
  price: Price;
  quantity: number;
  attributes: Attribute[];
  gallery: string[];
};
export type Item = {
  id: number;
  value: string;
  display_value: string;
  id_name: string;
  isSelected: boolean | undefined;
};
export type Category = {
  name: string;
};
