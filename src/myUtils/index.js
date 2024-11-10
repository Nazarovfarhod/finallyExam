export const baseUrl = "https://json-api.uz/api/project/fn23";

export const getFormData = (form) => {
  const data = new FormData(form);
  const obj = {};
  for (const [key, value] of data.entries()) obj[key] = value;

  return obj;
};