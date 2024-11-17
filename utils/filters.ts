

export interface Filter {
  createdAt?: { gte: Date; lte: Date; };
  itemId?: number;
  name?: { contains: string; mode: string };
  quantity?: { gte?: number; lte?: number };
}



export interface ItemFilters {
  OR?: Array<Record<string, { contains: string; mode: string }>>;
  quantity?: {
    gte?: number;
    lte?: number;
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





export function buildOrderFilters(itemId?: string, startDate?: string, endDate?: string) {
  const filters: Filter = {};

  if (itemId) {
    filters.itemId = Number(itemId);
  }
  if (startDate && endDate) {
    filters.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  return filters;
}