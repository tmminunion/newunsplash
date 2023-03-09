export default function findItemById(id) {
  var items = JSON.parse(localStorage.getItem("ALLtag"));

  const foundItem = items.find((item) => item.id === id);
  if (!foundItem) {
    return `Lainnya`;
  }
  return foundItem.judul;
}
