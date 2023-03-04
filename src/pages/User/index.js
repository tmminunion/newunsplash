import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import s from "./styles.module.scss";

import { getImagesAPI, getUserInfo } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";

import PageTitle from "../../utils/PageTitle";

const User = () => {
  const { username } = useParams();

  const [images, setImages] = useState([]);

  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    setImagesLoading(true);
    getImagesAPI(username)
      .then((response) => {
        setImages(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setImagesLoading(false);
      });
    return () => setImages([]);
  }, [username]);

  return (
    <PageTitle title={username ? `${username}` : "Loading"}>
      <div className={s.user_outer}>
        <div className='container'>
          <div className={s.user_inner}>zxcx</div>
        </div>
      </div>

      <div className={s.tabs_outer}>
        <div className={s.tabs_inner}>{}</div>
      </div>

      <ImagesGrid images={images} loading={imagesLoading} />
    </PageTitle>
  );
};

export default User;
