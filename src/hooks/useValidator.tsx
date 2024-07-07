import validator from "validator";

const useValidator = (values: [{ value?: string; min?: number; max?: number; regex?: RegExp; isEmail?: boolean }]) => {
  try {
    values.forEach(({ value, min, max, regex, isEmail }) => {
      if (!value) throw new Error();
      value = value.replace(/\s+/g, " ").trim();
      if (min && max && !validator.isLength(value, { min, max })) throw new Error();
      if (isEmail) if (!validator.isEmail(value)) throw new Error();
      if (regex) if (!validator.matches(value, regex)) throw new Error();
    });
  } catch (_e) {
    return false;
  }
  return true;
};

export default useValidator;
