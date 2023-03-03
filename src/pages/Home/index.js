import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./styles.module.scss";

import { useAppContext } from "../../context";
import { getBackgroundImage, getImages, getImagesAPI } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import Form from "../../components/Form";
import useMatch from "../../hooks/useMatch";
import PageTitle from "../../utils/PageTitle";
import RenderIf from "../../utils/RenderIf";

const Home = () => {
  const { openModal } = useAppContext();
  const [photoBy, setPhotoBy] = useState({});
  const [images, setImages] = useState([]);
  const { urls, description, user } = photoBy;
  const match = useMatch("(min-width: 768px)");

  useEffect(() => {
    getBackgroundImage()
      .then((res) => {
        setPhotoBy(res[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => setPhotoBy({});
  }, []);

  useEffect(() => {
    getImagesAPI()
      .then((response) => {
        setImages(response);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => setImages([]);
  }, []);

  const handleOpenModal = (id) => {
    openModal({
      type: "imageModal",
      data: { id: id },
    });
  };

  return (
    <PageTitle title='Home'>
      <div className={s.header_outer}>
        <div className={s.header_bg}>
          <LazyLoadImage
            src={urls?.regular}
            alt={description}
            effect='blur'
            placeholderSrc={urls?.small}
          />
        </div>

        <div className='container'>
          <div className={s.header_inner}>
            <div className={s.header_content}>
              <h1>Unsplash</h1>
              <p>
                The internet’s source for visuals. <br /> Powered by creators
                everywhere.
              </p>
              <RenderIf isTrue={match}>
                <Form />
              </RenderIf>
            </div>
          </div>
        </div>

        <div className={s.header_user}>
          <button onClick={() => handleOpenModal(photoBy?.id)}>Photo</button>
          <span>by</span>
          <Link to={`/${user?.username}`}>{user?.username}</Link>
        </div>
      </div>

      <ImagesGrid images={images} />
    </PageTitle>
  );
};

export default Home;
