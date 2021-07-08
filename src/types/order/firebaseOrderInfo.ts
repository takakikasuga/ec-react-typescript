export interface firebaseOrderInfo {
  userId?: string | null;
  orderInfo: {
    orderItems: [
      {
        itemCount: number;
        itemName?: string | null | undefined;
        itemId: number;
        itemPrice: number;
        uniqueItemId?: string;
      }
    ];
    status?: number;
  };
}
