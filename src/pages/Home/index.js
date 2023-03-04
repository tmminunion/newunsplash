import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import s from "./styles.module.scss";
import Modal from "@mui/material/Modal";
import { getImagesAPI } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/PageTitle";
import Modaluplod from "../../components/Modals/Upload";
import { faker } from "@faker-js/faker";

const Home = () => {
  const [images, setImages] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getImagesAPI(1).then((response) => {
      setImages(response);
      localStorage.setItem("bgimage", response[0].filepath);
    });

    return () => setImages([]);
  }, []);

  const imgbg = (() => {
    if (localStorage.getItem("bgimage")) {
      return localStorage.getItem("bgimage");
    } else {
      return faker.image.abstract();
    }
  })();
  return (
    <PageTitle title='Home'>
      <div className={s.header_outer}>
        <div className={s.header_bg}>
          <LazyLoadImage
            src={imgbg}
            alt={faker.lorem.text()}
            effect='blur'
            placeholderSrc={imgbg}
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
