import { email, minLength, required } from "@vuelidate/validators";

export const validateRules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};
