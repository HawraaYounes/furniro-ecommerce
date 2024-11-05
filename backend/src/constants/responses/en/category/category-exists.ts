import { STATUS_CONFLICT } from "src/constants/codes/status-codes";

export const CATEGORY_ALREADY_EXISTS = {
    success: false,
    statusCode: STATUS_CONFLICT,
    message: 'Category with this name already exists',
    data: null,
  };