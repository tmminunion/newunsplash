import estring from "../../../utils/idgenerator";
import generateRandomString from "../../../utils/GenerateIDslug";
import { Sendphoto, Sendsync } from "../../../api";
import slug from "slug";
import { ref, set } from "firebase/database";
import database from "../../../utils/firebase";

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,

  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  var namanya = localStorage.getItem("namatit");
  if (!namanya) {
    var nameimage = "photo";
    console.log("poto");
  } else {
    var nameimage = namanya;
  }

  const base64 = canvas.toDataURL("image/jpeg");
  const idnya = estring(20);

  var datanya = JSON.stringify({
    id: idnya,
    imgid: idnya,
    album_id: 1,
    album_title: nameimage,
    tag_title: nameimage,
    tag_slug: slug(nameimage),
    tag_id: generateRandomString(nameimage),
    filepath: `https://wabot.nufat.id/img/${idnya}`,
    thumbnail: `https://wabot.nufat.id/img/${idnya}/thumb/500/500`,
    low: `https://wabot.nufat.id/img/${idnya}/thumb/500/500`,
    width: canvas.width,
    height: canvas.height,
    user_id: localStorage.getItem("user_id"),
    user_nama: localStorage.getItem("user_nama"),
    user_noreg: localStorage.getItem("user_noreg"),
    uploaded_date: Date.now(),
  });

  var datacate = JSON.stringify({
    id: generateRandomString(nameimage),
    slug: slug(nameimage),
    title: nameimage,
    judul: nameimage,
  });

  Sendphoto("sendcategori", datacate).then((response) => {
    console.log(response);
  });
  const db = database;

  set(ref(db, "data/" + idnya), {
    id: idnya,
    image: base64,
    width: canvas.width,
    height: canvas.height,
  })
    .then(() => {
      Sendsync(idnya).then((response) => {
        Sendphoto("sendpoto", datanya).then((response) => {
          console.log("photo terkirim");
          window.location.href = "/";
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
}

export async function getRotatedImage(imageSrc, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const orientationChanged =
    rotation === 90 ||
    rotation === -90 ||
    rotation === 270 ||
    rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/png");
  });
}
