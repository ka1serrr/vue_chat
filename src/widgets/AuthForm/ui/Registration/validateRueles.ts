import { email, minLength, required } from "@vuelidate/validators";

export const validateRules = {
  email: { required, email },
  displayName: { required, minLength: minLength(2) },
  password: { required, minLength: minLength(6) },
};
