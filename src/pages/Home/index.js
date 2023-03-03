import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import s from "./styles.module.scss";
import Modal from "@mui/material/Modal";
import { getBackgroundImage, getImagesAPI } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/PageTitle";
import Modaluplod from "../../components/Modals/Upload";

const Home = () => {
  const [photoBy, setPhotoBy] = useState({});
  const [images, setImages] = useState([]);
  const { urls, description } = photoBy;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getBackgroundImage().then((res) => {
      setPhotoBy(res[0]);
    });

    return () => setPhotoBy({});
  }, []);

  useEffect(() => {
    getImagesAPI().then((response) => {
      setImages(response);
    });

    return () => setImages([]);
  }, []);

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
              <h1>Image Gallery</h1>
              <p>Powered by bungtemin.net</p>
            </div>

            <button onClick={handleOpen} className={s.buttonnya}>
              Upload Foto
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Modaluplod></Modaluplod>
            </Modal>
          </div>
        </div>
      </div>

      <ImagesGrid images={images} />
    </PageTitle>
  );
};

export default Home;
