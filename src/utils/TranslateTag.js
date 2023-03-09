const items = [
  {
    id: "velvet",
    slug: "velvet",
    title: "velvet",
  },
  {
    id: "tow truck, tow car, wrecker",
    slug: "tow truck, tow car, wrecker",
    title: "tow truck, tow car, wrecker",
  },
  {
    id: "lampshade, lamp shade",
    slug: "lampshade, lamp shade",
    title: "lampshade, lamp shade",
  },
  {
    id: "desktop computer",
    slug: "desktop computer",
    title: "desktop computer",
  },
  {
    id: "steel drum",
    slug: "steel drum",
    title: "steel drum",
  },
  {
    id: "fountain",
    slug: "fountain",
    title: "fountain",
  },
  {
    id: "desk",
    slug: "desk",
    title: "desk",
  },
  {
    id: "soccer ball",
    slug: "soccer ball",
    title: "Sepak Bola",
  },
  {
    id: "digital clock",
    slug: "digital clock",
    title: "digital clock",
  },
  {
    id: "stage",
    slug: "stage",
    title: "stage",
  },
  {
    id: "pop bottle, soda bottle",
    slug: "pop bottle, soda bottle",
    title: "pop bottle, soda bottle",
  },
  {
    id: "jack-o'-lantern",
    slug: "jack-o'-lantern",
    title: "jack-o'-lantern",
  },
  {
    id: "web site, website, internet site, site",
    slug: "web site, website, internet site, site",
    title: "web site, website, internet site, site",
  },
  {
    id: "minivan",
    slug: "minivan",
    title: "minivan",
  },
  {
    id: "nail",
    slug: "nail",
    title: "nail",
  },
  {
    id: "reflex camera",
    slug: "reflex camera",
    title: "reflex camera",
  },
  {
    id: "sports car, sport car",
    slug: "sports car, sport car",
    title: "sports car, sport car",
  },
  {
    id: "pomegranate",
    slug: "pomegranate",
    title: "pomegranate",
  },
  {
    id: "patio, terrace",
    slug: "patio, terrace",
    title: "patio, terrace",
  },
  {
    id: "toyshop",
    slug: "toyshop",
    title: "toyshop",
  },
  {
    id: "comic book",
    slug: "comic book",
    title: "comic book",
  },
  {
    id: "hummingbird",
    slug: "hummingbird",
    title: "hummingbird",
  },
  {
    id: "necklace",
    slug: "necklace",
    title: "necklace",
  },
  {
    id: "park bench",
    slug: "park bench",
    title: "park bench",
  },
  {
    id: "balloon",
    slug: "balloon",
    title: "balloon",
  },
  {
    id: "promontory, headland, head, foreland",
    slug: "promontory, headland, head, foreland",
    title: "promontory, headland, head, foreland",
  },
  {
    id: "bobsled, bobsleigh, bob",
    slug: "bobsled, bobsleigh, bob",
    title: "bobsled, bobsleigh, bob",
  },
  {
    id: "seashore, coast, seacoast, sea-coast",
    slug: "seashore, coast, seacoast, sea-coast",
    title: "seashore, coast, seacoast, sea-coast",
  },
  {
    id: "lighter, light, igniter, ignitor",
    slug: "lighter, light, igniter, ignitor",
    title: "lighter, light, igniter, ignitor",
  },
  {
    id: "jeep, landrover",
    slug: "jeep, landrover",
    title: "jeep, landrover",
  },
  {
    id: "fur coat",
    slug: "fur coat",
    title: "fur coat",
  },
  {
    id: "iPod",
    slug: "iPod",
    title: "iPod",
  },
  {
    id: "poncho",
    slug: "poncho",
    title: "poncho",
  },
  {
    id: "3O75J0K",
    slug: "macaque",
    title: "macaque",
  },
  {
    id: "RblIp7W72MKIe0PWfHOQIHdhUePLDVKtqVwnibQkpDoJ",
    slug: "grey-fox-gray-fox-urocyon-cinereoargenteus",
    title: "Srigala",
  },
];

export default function findItemById(id) {
  const foundItem = items.find((item) => item.id === id);
  if (!foundItem) {
    return `Lainnya`;
  }
  return foundItem.title;
}
