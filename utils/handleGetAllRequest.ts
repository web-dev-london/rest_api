import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "./errorHandler";


interface QueryParams<T> {
  filters: T;
  sorting: Record<string, 'asc' | 'desc'>;
  offset: number;
  limit: number;
};

export interface GetAllResponse<D> {
  data: D[];
  total: number;
}

export async function handleGetAllRequest<T, D>(
  request: NextRequest,
  buildFilters: (params: URLSearchParams) => T,
  getAllCallback: (options: QueryParams<T>) => Promise<GetAllResponse<D>>,
): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const {
      sort,
      order,
      page = '1',
      limit = '10',
    } = Object.fromEntries(searchParams);

    // Convert pagination parameters
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;

    // Generate filters 
    const filters = buildFilters(searchParams);

    // Sorting logic
    const sorting: Record<string, 'asc' | 'desc'> = sort
      ? { [sort]: order === 'desc' ? 'desc' : 'asc' } : {};

    // Fetch data and total count
    const { data, total } = await getAllCallback({
      filters,
      sorting,
      offset,
      limit: limitNumber,
    });

    // Format response
    const response = {
      data,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    };

    return NextResponse.json(
      {
        success: true,
        message: "Items fetched successfully",
        ...response,
      },
      {
        status: 200
      }
    );
  } catch (error) {
    return handleErrors(error);
  }
};
