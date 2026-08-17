export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerId: number;
  createdAt: string;
  total: number;
  items: OrderItem[];
}

export interface PaginatedOrders {
  items: Order[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CreateOrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  customerId: number;
  items: CreateOrderItemRequest[];
}