export const transformError = (error: unknown) => {
  let errorMessage;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = String(error);
  }

  const errors = {
    thisEmailInUse: "This email is already in use",
    wrongCredential: "Wrong email or password",
    unRegisteredError: "An error occurred",
  };

  if (errorMessage.toLowerCase().includes("in-use")) {
    return errors.thisEmailInUse;
  } else if (errorMessage.toLowerCase().includes("credential")) {
    return errors.wrongCredential;
  } else {
    return errors.unRegisteredError;
  }
};
