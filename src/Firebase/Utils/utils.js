export default function filedToUpdate(obj) {
  let filterddata = {};
  for (let key in obj) {
    if (obj[key] !== "") {
      let item = { [key]: obj[key] };
      filterddata = { ...filterddata, ...item };
    }
  }
  return filterddata;
}
