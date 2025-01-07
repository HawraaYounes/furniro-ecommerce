export const buildResponse = <T>(
    template: { success: boolean; statusCode: number; message: string },
    data: T,
    meta?: Record<string, any>
  ) => {
    return {
      ...template,
      data, // Replace data dynamically
      ...(meta && { meta }), // Add meta only if provided
    };
  };
  