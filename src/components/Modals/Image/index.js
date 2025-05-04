import React, { useEffect, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";
import { faker } from "@faker-js/faker";
import s from "./styles.module.scss";
import { MdOutlineCalendarToday } from "react-icons/md";

import { useAppContext } from "../../../context";
import { getImageAPI } from "../../../api";
import { Link } from "react-router-dom";
import { Spinner } from "../../../UI/Loading";
import useMatch from "../../../hooks/useMatch";

import DownloadImage from "../../../utils/DownloadImage";
import { dateFormat } from "../../../utils/Helpers";
faker.locale = "id_ID";
const Image = () => {
  const { modalProps, modalRef, closeModal } = useAppContext();
  const [image, setImage] = useState({});

  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const match = useMatch("(max-width: 768px)");

  const { data } = modalProps;
  const { uploaded_date, filepath, album_title, tag_id } = image;

  useEffect(() => {
    setLoading(true);
    getImageAPI(data?.id)
      .then((res) => {
        setImage(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => setImage({});
  }, [data?.id]);

  useEffect(() => {
    if (modalProps?.isOpen) {
      if (data?.id) {
        modalRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [modalProps?.isOpen, data?.id, modalRef]);

  useEffect(() => {
    if (match) {
      setIsZooming(false);
    }
  }, [match, isZooming]);

  const handleZoom = () => {
    if (match) return;
    setIsZooming(!isZooming);
  };

  return (
    <div className={s.modal}>
      <div className={s.modal_header}>
        <div className={s.user}>
          <div className={s.photo}>
            <LazyLoadImage
              src='https://bungtemin.net/assets/img/logo512.png'
              alt='{user?.name}'
              effect='blur'
            />
          </div>
          <Link to={`t/${tag_id}`} onClick={closeModal}>
            {album_title}
          </Link>
        </div>
        <div className={s.download}>
          <a
            href={filepath}
            download
            className={isDownloading ? s.disable_button : ""}
            onClick={(e) => DownloadImage(e, setIsDownloading)}
          >
            {isDownloading
              ? "Sudah di copy dan Download"
              : "Copy Link Image dan Download"}
          </a>
        </div>
      </div>

      <div className={clsx(s.modal_body, { [s.full_image]: isZooming })}>
        <Spinner loading={loading}>
          <LazyLoadImage
            src={filepath}
            alt='desc'
            effect='blur'
            onClick={handleZoom}
          />
        </Spinner>
      </div>

      <div className={s.modal_footer}>
        <div className={s.first_row}></div>

        <div className={s.second_row}>
          <div className={s.second_row_item}>
            <MdOutlineCalendarToday />

            <div>Published on {dateFormat(uploaded_date)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
