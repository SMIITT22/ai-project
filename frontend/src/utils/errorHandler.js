const getFriendlyErrorMessage = (error) => {
  if (!error) {
    return "An unexpected error occurred.";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error?.detail) {
    return error.detail;
  }

  if (error?.message) {
    return error.message;
  }

  switch (error?.status) {
    case 401:
      return "You are not authorized. Please login and try again.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 500:
      return "A server error occurred. Please try again later.";
    default:
      return "An unknown error occurred.";
  }
};

export default getFriendlyErrorMessage;
