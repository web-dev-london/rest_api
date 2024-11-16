interface Filter {
  createdAt?: { gte: Date; lte: Date; };
  itemId?: number;
  name?: { contains: string; mode: string };
  quantity?: { gte?: number; lte?: number };
}

export function buildItemFilters(search?: string, minQuantity?: string, maxQuantity?: string) {
  const filters: Filter = {};

  if (search) {
    filters.name = { contains: search, mode: 'insensitive' };
  }
  if (minQuantity) {
    filters.quantity = { gte: Number(minQuantity) };
  }
  if (maxQuantity) {
    filters.quantity = { lte: Number(maxQuantity) };
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