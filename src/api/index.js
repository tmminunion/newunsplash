import axios from "axios";

const ACCESS_KEY = "o8XokWkKZqJUPogocq58S9_73RF71wG2k11hWC5DIdc";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common = {
  Authorization: `Basic ZGJqc29uVVNFUjpkYmpzb25VU0VS`,
};
const wrapper = (method, url, data) =>
  axios.request({ method, url, data }).then((response) => response.data);

export const getCollection = (id) => {
  return wrapper("get", `collections/${id}/photos?client_id=${ACCESS_KEY}`);
};

export const getSearchImages = (name, sort = "relevance", orientation) => {
  return wrapper(
    "get",
    `search/photos?client_id=${ACCESS_KEY}&query=${name}&order_by=${sort}${
      orientation ? `&orientation=${orientation}` : ""
    }`
  );
};

export const getSearchCollections = (name) => {
  return wrapper(
    "get",
    `search/collections?client_id=${ACCESS_KEY}&query=${name}`
  );
};

export const getUserInfo = (username) => {
  return wrapper("get", `users/${username}/?client_id=${ACCESS_KEY}`);
};

export const getTopics = () => {
  return wrapper("get", `topics?client_id=${ACCESS_KEY}`);
};

export const getTopic = (slug) => {
  return wrapper("get", `topics/${slug}?client_id=${ACCESS_KEY}`);
};

export const getSearchUsers = (name) => {
  return wrapper("get", `search/users?client_id=${ACCESS_KEY}&query=${name}`);
};

export const getImageAPI = (id) => {
  return axios
    .get(`https://img.bungtemin.net/photo/${id}`)
    .then((response) => response.data);
};
export const getCARI = (slug, id) => {
  return axios
    .get(
      `https://img.bungtemin.net/photo?q=${slug}&_page=${id}&_limit=30&_sort=id&_order=desc`
    )
    .then((response) => response);
};
export const getbyALBUM = (slug, id) => {
  return axios
    .get(
      `https://img.bungtemin.net/photo?album_title=${slug}&_page=${id}&_limit=30&_sort=id&_order=desc`
    )
    .then((response) => response.data);
};
export const getImagesAPI = (id) => {
  return axios
    .get(
      `https://img.bungtemin.net/photo?_page=${id}&_limit=30&_sort=id&_order=desc`
    )
    .then((response) => response.data);
};

export const getnumAPI = (id) => {
  return axios
    .get(
      `https://img.bungtemin.net/photo?_page=${id}&_limit=30&_sort=id&_order=desc`
    )
    .then((response) => response.headers);
};
export const getcatAPI = (id) => {
  return axios
    .get(
      `https://img.bungtemin.net/categori?_page=1&_limit=120&_sort=id&_order=asc`
    )
    .then((response) => response.data);
};
export function Sendphoto(url, datanya) {
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://img.bungtemin.net/${url}`,
    headers: {
      Authorization: "Basic ZGJqc29uVVNFUjpkYmpzb25VU0VS",
      "Content-Type": "application/json",
    },
    data: datanya,
  };

  return axios(config).then((response) => response.data);
}
