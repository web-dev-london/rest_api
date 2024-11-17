export interface ItemFilters {
  OR?: Array<Record<string, { contains: string; mode: string }>>;
  quantity?: {
    gte?: number;
    lte?: number;
  };
}

export interface OrderFilters {
  itemId?: string;
  createdAt?: { gte: Date; lte: Date; };
}

export interface Order {
  id: string;
  quantity: number;
  inventoryItemId: string;
  createdAt: Date;
  updatedAt: Date;
  inventoryItem: {
    id: string;
    name: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    price: number;
    supplier: string | null;
  };
}


// Function to build filters from query parameters
export function buildItemFilters(params: URLSearchParams): ItemFilters {
  const filters: ItemFilters = {};

  if (params.has("search")) {
    const search = params.get("search")!;
    filters.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { supplier: { contains: search, mode: "insensitive" } },
    ];
  }

  if (params.has("minQuantity")) {
    filters.quantity = { ...filters.quantity, gte: parseInt(params.get("minQuantity")!, 10) };
  }

  if (params.has("maxQuantity")) {
    filters.quantity = { ...filters.quantity, lte: parseInt(params.get("maxQuantity")!, 10) };
  }

  return filters;
}


export function buildOrderFilters(itemId?: string, startDate?: string, endDate?: string): OrderFilters {
  const filters: OrderFilters = {};

  if (itemId) {
    filters.itemId = itemId
  }


  if (startDate && endDate) {
    filters.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    }
    if (startDate) {
      filters.createdAt.gte = new Date(startDate)
    }
    if (endDate) {
      filters.createdAt.lte = new Date(endDate)
    }
  }

  return filters;
}