export interface OrderItems {
  itemCount: number;
  itemId: number;
  itemName: string;
  itemPrice: number;
  uniqueItemId: string;
}

export interface FetchObject {
  address: string;
  email: string;
  name: string;
  orderDate: string;
  orderItems: Array<OrderItems>
  orderUniqueId?: string;
  phoneNumber: string;
  status?: number;
  totoalPrice: number;
  zipcode: string;
}

export type FetchHistory = Array<FetchObject>

