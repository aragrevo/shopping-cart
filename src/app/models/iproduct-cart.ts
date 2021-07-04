import { IProduct } from './iproduct';

export interface IProductCart extends IProduct {
    Quantity: number;
    Price: number;
}
