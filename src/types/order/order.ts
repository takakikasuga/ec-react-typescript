export interface OrderInfo {
  orderUpdate: [{
    itemCount: number;
    itemId: number;
    itemPrice: number;
    uniqueItemId: string
  }],
  // status: number;
}

export interface AddOrder {
  userId: string | null;
  orderInfo: {
    orderItems: [{
      itemCount: number;
      itemId: number | null | undefined;
      itemPrice: number;
      uniqueItemId: string
    }],
  }
  status: number;
}