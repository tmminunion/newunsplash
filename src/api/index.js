import axios from "axios";

const ACCESS_KEY = process.env.REACT_APP_UNSPALSH_ACCESS_KEY;
const AUTH = process.env.REACT_APP_AUTH_BT;
const BTAPIauth = process.env.REACT_APP_BTauth;

axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH}`;

// Add a request interceptor
const wrapper = (method, url, data) =>
  axios.request({ method, url, data }).then((response) => response.data);

export const getBackgroundImage = () => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}collections/1459961/photos?client_id=${ACCESS_KEY}&orientation=landscape&per_page=1`
  );
};

export const getImage = (id) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}photos/${id}?client_id=${ACCESS_KEY}`
  );
};

export const getCollection = (id) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}collections/${id}/photos?client_id=${ACCESS_KEY}`
  );
};

export const getImages = () => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}photos?client_id=${ACCESS_KEY}`
  );
};

export const getSearchImages = (name, sort = "relevance", orientation) => {
  return wrapper(
    "get",
    `${
      process.env.REACT_APP_thbaseURL
    }search/photos?client_id=${ACCESS_KEY}&query=${name}&order_by=${sort}${
      orientation ? `&orientation=${orientation}` : ""
    }`
  );
};

export const getSearchCollections = (name) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}search/collections?client_id=${ACCESS_KEY}&query=${name}`
  );
};

export const getUserInfo = (username) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}users/${username}/?client_id=${ACCESS_KEY}`
  );
};

export const getUserImages = (username) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}users/${username}/photos?client_id=${ACCESS_KEY}`
  );
};

export const getTopics = () => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}topics?client_id=${ACCESS_KEY}`
  );
};

export const getTopic = (slug) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}topics/${slug}?client_id=${ACCESS_KEY}`
  );
};

export const getTopicImages = (slug) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}topics/${slug}/photos?client_id=${ACCESS_KEY}`
  );
};

export const getSearchUsers = (name) => {
  return wrapper(
    "get",
    `${process.env.REACT_APP_thbaseURL}search/users?client_id=${ACCESS_KEY}&query=${name}`
  );
};

export const getImageAPI = (id) => {
  return axios
    .get(`${BTAPIauth}/photo/${id}`)
    .then((response) => response.data);
};
export const getCARI = (slug, id) => {
  return axios
    .get(
      `${BTAPIauth}/photo?q=${slug}&_page=${id}&_limit=30&_sort=id&_order=desc`
    )
    .then((response) => response);
};
export const getbyALBUM = (slug, page) => {
  return axios
    .get(
      `${BTAPIauth}/photo?album_title=${slug}&_page=${page}&_limit=30&_sort=id&_order=desc`
    )
    .then((response) => response.data);
};
export const getbyTAG = (slug, page) => {
  return axios
    .get(
      `${BTAPIauth}/photo?tag_id=${slug}&_page=${page}&_limit=30&_sort=id&_order=desc`
    )
    .then((response) => response.data);
};
export const getImagesAPI = (id) => {
  return axios
    .get(`${BTAPIauth}/photo?_page=${id}&_limit=30&_sort=id&_order=desc`)
    .then((response) => response.data);
};

export const getnumAPI = (id) => {
  return axios
    .get(`${BTAPIauth}/photo?_page=${id}&_limit=30&_sort=id&_order=desc`)
    .then((response) => response.data);
};

export const getcatAPI = (id) => {
  return axios
    .get(`${BTAPIauth}/category?_page=1&_limit=120&_sort=id&_order=asc`)
    .then((response) => response.data);
};

export function Sendphoto(url, datanya) {
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BTAPIauth}/${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: datanya,
  };

  return axios(config).then((response) => response.data);
}

export function LoginUser(data) {
  var config = {
    method: "post",
    url: `${BTAPIauth}/login/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then((response) => response.data);
}

export function Sendsync(datanya) {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BTAPIauth}/datafire/${datanya}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: datanya,
  };

  return axios(config).then((response) => response.data);
}
