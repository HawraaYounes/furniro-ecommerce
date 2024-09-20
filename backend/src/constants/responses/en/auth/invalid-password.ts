import { STATUS_UNAUTHORIZED } from 'src/constants/codes/status-codes'; // Ensure this constant exists

export const INVALID_PASSWORD = {
  success: false,
  statusCode: STATUS_UNAUTHORIZED,
  message: 'Incorrect email and password!',
  data: null,
};