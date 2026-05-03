import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Download, Calendar, Maximize2, Minimize2, Heart, Share2, Info } from "lucide-react";

import clsx from "clsx";
import s from "./styles.module.scss";

import { useAppContext } from "../../../context";
import { getImageAPI } from "../../../api";
import { Link } from "react-router-dom";
import { Spinner } from "../../../UI/Loading";
import useMatch from "../../../hooks/useMatch";

import DownloadImage from "../../../utils/DownloadImage";
import { dateFormat } from "../../../utils/Helpers";

const ImageModalContent = () => {
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
        console.log("Error fetching image details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => setImage({});
  }, [data?.id]);

  useEffect(() => {
    if (modalProps?.isOpen && modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [modalProps?.isOpen, data?.id, modalRef]);

  const handleZoom = () => {
    if (!match) setIsZooming(!isZooming);
  };

  return (
    <div className={`${s.modal_container} glass`}>
      <header className={s.header}>
        <div className={s.user_info}>
          <div className={s.avatar}>
            <img src='https://bungtemin.net/assets/img/logo512.png' alt='Author' />
          </div>
          <div className={s.meta}>
            <Link to={`/t/${tag_id}`} className={s.album_name} onClick={closeModal}>
              {album_title || "BT-Gallery Image"}
            </Link>
            <span className={s.author_name}>by @bungtemin</span>
          </div>
        </div>

        <div className={s.actions}>
          <button className={s.action_btn} title="Add to favorites">
            <Heart size={20} />
          </button>
          <button className={s.action_btn} title="Share">
            <Share2 size={20} />
          </button>
          <a
            href={filepath}
            className={clsx(s.download_btn, { [s.loading]: isDownloading })}
            onClick={(e) => DownloadImage(e, setIsDownloading)}
          >
            <Download size={18} />
            {!match && (isDownloading ? "Downloading..." : "Download Free")}
          </a>
        </div>
      </header>

      <div className={clsx(s.body, { [s.zoomed]: isZooming })}>
        <Spinner loading={loading}>
          <div className={s.image_wrapper} onClick={handleZoom}>
            <LazyLoadImage
              src={filepath}
              alt={album_title}
              effect='blur'
              className={s.main_image}
            />
            {!match && (
              <div className={s.zoom_indicator}>
                {isZooming ? <Minimize2 /> : <Maximize2 />}
              </div>
            )}
          </div>
        </Spinner>
      </div>

      <footer className={s.footer}>
        <div className={s.details}>
          <div className={s.detail_item}>
            <Calendar size={16} />
            <span>Published on {dateFormat(uploaded_date)}</span>
          </div>
          <div className={s.detail_item}>
            <Info size={16} />
            <span>Free to use under the BT-Gallery License</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImageModalContent;
