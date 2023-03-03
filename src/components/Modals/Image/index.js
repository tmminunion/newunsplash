import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";

import s from "./styles.module.scss";
import { MdOutlineCalendarToday, MdPhotoCamera } from "react-icons/md";

import { useAppContext } from "../../../context";
import { getImageAPI } from "../../../api";

import { Spinner } from "../../../UI/Loading";
import useMatch from "../../../hooks/useMatch";

import DownloadImage from "../../../utils/DownloadImage";
import { dateFormat } from "../../../utils/Helpers";

const Image = () => {
  const { modalProps, modalRef, closeModal } = useAppContext();
  const [image, setImage] = useState({});

  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const match = useMatch("(max-width: 768px)");

  const { data } = modalProps;
  const { views, downloads, user, created_at, urls, filepath, exif } = image;

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
              src='https://images.unsplash.com/profile-1609545740442-928866556c38image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32'
              alt='{user?.name}'
              effect='blur'
            />
          </div>
          <Link to={`/namauser`} onClick={closeModal}>
            nama nya
          </Link>
        </div>
        <div className={s.download}>
          <a
            href={urls?.raw}
            download
            className={isDownloading ? s.disable_button : ""}
            onClick={(e) =>
              DownloadImage(e, user?.username, data?.id, setIsDownloading)
            }
          >
            {isDownloading ? "Downloading" : "Download"}
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
        <div className={s.first_row}>
          <div className={s.first_row_item}>
            <h3>Views</h3>

            <span>wwqeqweqw</span>
          </div>
          <div className={s.first_row_item}>
            <h3>Downloads</h3>

            <span>2312312312</span>
          </div>
        </div>

        <div className={s.second_row}>
          <div className={s.second_row_item}>
            <MdOutlineCalendarToday />

            <div>Published on {dateFormat("2023-02-28T10:48:27Z")}</div>
          </div>

          <div className={s.second_row_item}>
            <MdPhotoCamera />
            <div>jhbjb</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
