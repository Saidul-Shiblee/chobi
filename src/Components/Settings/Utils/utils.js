export default function filterObject(obj, ...args) {
  let objToBeFiltered;
  let requiredField = [...args];
  let convertedArray;
  if (Array.isArray(obj)) {
    convertedArray = Object.keys(obj[0]);
    objToBeFiltered = obj[0];
  } else {
    convertedArray = Object.keys(obj);
    objToBeFiltered = obj;
  }
  return requiredField
    .filter((value) => convertedArray.includes(value))
    .map((element) => ({ [element]: objToBeFiltered[element] }))
    .reduce((obj, item) => Object.assign(obj, item), {});
}
