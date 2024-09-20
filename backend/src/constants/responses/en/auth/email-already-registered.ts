import { STATUS_CONFLICT } from "src/constants/codes/status-codes";

export const EMAIL_ALREADY_REGISTERED = {
  success: false,
  statusCode: STATUS_CONFLICT,
  message: 'Email address is already registered. Please use a different email or log in.',
  data: null,
};