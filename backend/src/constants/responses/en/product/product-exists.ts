import { STATUS_CONFLICT } from "src/constants/codes/status-codes";

export const PRODUCT_ALREADY_EXISTS = {
    success: false,
    statusCode: STATUS_CONFLICT,
    message: 'Product with this name already exists',
    data: null,
  };