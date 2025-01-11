export interface ResponseMeta {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  }
  
 export interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T; 
    meta?: ResponseMeta; 
  }