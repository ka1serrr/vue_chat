import { email, minLength, required, requiredIf } from "@vuelidate/validators";

export const validateRules = (avatar: null | Blob) => {
  return {
    email: { required, email },
    displayName: { required, minLength: minLength(2) },
    password: { required, minLength: minLength(6) },
    avatar: {
      required: requiredIf(() => {
        return !avatar;
      }),
    },
  };
};
