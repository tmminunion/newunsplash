import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import s from "./styles.module.scss";
import Modal from "@mui/material/Modal";
import { getImagesAPI, getnumAPI } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/PageTitle";
import Modaluplod from "../../components/Modals/Upload";
import { faker } from "@faker-js/faker";
import Pagination from "@mui/material/Pagination";
const Home = () => {
  const [images, setImages] = useState([]);
  const [totimages, totsetImages] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getImagesAPI(1).then((response) => {
      setImages(response.data);
      localStorage.setItem("bgimage", response.data[0].filepath);
    });
    getnumAPI(1).then((response) => {
      console.log(response.pagination);
      totsetImages(response.pagination.totalPages);
      setPage(1);
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
  const handleChangePage = (event, newPage) => {
    getImagesAPI(newPage).then((response) => {
      setImages(response.data);
    });
  };
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
      <div className={s.user_outer}>
        <div className='container'>
          <div className={s.user_inner}>
            {" "}
            <Pagination
              count={totimages}
              variant='outlined'
              shape='rounded'
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </PageTitle>
  );
};

export default Home;
