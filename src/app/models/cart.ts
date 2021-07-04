import { StatusCart } from './status-cart.enum';

export interface Cart {
    id: string;
    status: StatusCart;
}
