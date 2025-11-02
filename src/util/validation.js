export function isNotEmpty(text) {
  return text.trim() !== "";
}

export function isEmail(value) {
  return value.includes("@");
}

export function isValidPhone(value) {
  const regex = /^\d{7}$/;
  return regex.test(value.trim());
}
