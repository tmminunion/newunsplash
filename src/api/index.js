import axios from "axios";

const ACCESS_KEY = "o8XokWkKZqJUPogocq58S9_73RF71wG2k11hWC5DIdc";
axios.defaults.baseURL = "https://api.unsplash.com/";

const wrapper = (method, url, data) =>
  axios.request({ method, url, data }).then((response) => response.data);

export const getBackgroundImage = () => {
  return wrapper(
    "get",
    `collections/1459961/photos?client_id=${ACCESS_KEY}&orientation=landscape&per_page=1`
  );
};

export const getCollection = (id) => {
  return wrapper("get", `collections/${id}/photos?client_id=${ACCESS_KEY}`);
};

export const getImage = (id) => {
  return wrapper("get", `photos/${id}?client_id=${ACCESS_KEY}`);
};

export const getImages = () => {
  return wrapper("get", `photos?client_id=${ACCESS_KEY}`);
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

export const getUserImages = (username) => {
  return wrapper("get", `users/mailchimp/photos?client_id=${ACCESS_KEY}`);
};

export const getTopics = () => {
  return wrapper("get", `topics?client_id=${ACCESS_KEY}`);
};

export const getTopic = (slug) => {
  return wrapper("get", `topics/${slug}?client_id=${ACCESS_KEY}`);
};

export const getTopicImages = (slug) => {
  return wrapper("get", `topics/${slug}/photos?client_id=${ACCESS_KEY}`);
};

export const getSearchUsers = (name) => {
  return wrapper("get", `search/users?client_id=${ACCESS_KEY}&query=${name}`);
};

export const getImageAPI = (id) => {
  return axios
    .get(`https://api.bungtemin.net/images/photo/${id}`)
    .then((response) => response.data);
};
export const getImagesAPI = () => {
  return axios
    .get("https://api.bungtemin.net/images/photo")
    .then((response) => response.data);
};
