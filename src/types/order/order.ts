export interface OrderInfo {
  orderUpdate: [
    {
      itemCount: number;
      itemId: number;
      itemPrice: number;
      uniqueItemId: string;
    }
  ];
  // status: number;
}

export interface AddOrder {
  userId: string | null;
  orderInfo: {
    orderItems: [
      {
        itemCount: number;
        itemId: number | null | undefined;
        itemPrice: number;
        uniqueItemId: string;
      }
    ];
  };
  status: number;
}

export interface FetchOrder {
  itemCount: number;
  itemId: number;
  itemPrice: number;
  uniqueItemId?: string;
  itemName?: string;
}
export interface DeleteOrder {
  statusZeroId: string;
  updateFetchData: Array<FetchOrder>;
  userId: string;
}

export interface OrderUpdate {
  orderInfo: {
    orderItems: {
      itemCount: number;
      itemId: number | null | undefined;
      itemPrice: number;
      uniqueItemId?: string;
    }[];
  };
  status: number;
  userId: string | undefined;
}
