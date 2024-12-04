type TypeEstate = 'house' | 'commercial' | 'apartment';

export interface IEstate {
  id: number;
  address: string;
  city: string;
  type: TypeEstate;
  price: number;
  currency: string;
}
