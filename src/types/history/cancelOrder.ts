interface OrderItems {
  itemCount: number;
  itemId: number;
  itemName: string;
  itemPrice: number;
  uniqueItemId: string;
}

export interface CancelObject {
  address: string;
  email: string;
  name: string;
  orderDate: string;
  orderItems: Array<OrderItems>
  orderUniqueId?: string;
  phoneNumber: string;
  status?: number
  totoalPrice: number
  zipcode: string;
}

export type CancelOrder = {
  // copyOrderHistory: Array<CancelObject>;
  uniqueOrderId: string;
  userId: string;
}

export type UpdateCancelOrder = {
  copyOrderHistory: Array<CancelObject>;
  uniqueOrderId: string;
}