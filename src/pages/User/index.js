import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import s from "./styles.module.scss";
import Pagination from "@mui/material/Pagination";
import { getImagesAPI, getnumAPI } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";

import PageTitle from "../../utils/PageTitle";

const User = () => {
  const { halaman } = useParams();

  const [images, setImages] = useState([]);
  const [totimages, totsetImages] = useState(10);

  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    setImagesLoading(true);
    getnumAPI(1).then((response) => {
      var totalItems = response["x-total-count"];
      var totalPages = Math.ceil(totalItems / 30);
      totsetImages(totalPages);
      setPage(1);
    });
    getImagesAPI(halaman)
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
  }, [halaman]);
  const [page, setPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    getImagesAPI(newPage)
      .then((response) => {
        setImages(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setImagesLoading(false);
      });
  };

  return (
    <PageTitle title={halaman ? `${halaman}` : "Loading"}>
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

      <div className={s.tabs_outer}>
        <div className={s.tabs_inner}>{}</div>
      </div>

      <ImagesGrid images={images} loading={imagesLoading} />
    </PageTitle>
  );
};

export default User;
