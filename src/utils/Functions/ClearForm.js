export default function ClearForm(values) {
  const data = {};
  for (const property in values) {
    data[property] = "";
  }
  return data;
}
