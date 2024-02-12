export const transformError = (error: unknown) => {
  let errorMessage;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = String(error);
  }

  const errors = {
    thisEmailInUse: "This email is already in use",
  };

  if (errorMessage.includes("in-use")) {
    return errors.thisEmailInUse;
  }
};
