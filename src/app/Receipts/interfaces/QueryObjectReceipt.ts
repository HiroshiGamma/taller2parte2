export interface QueryObject {
    pageNumber: number;
    pageSize: number;
    name?: string;
    isDescending?: boolean;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
  }