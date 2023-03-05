import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";

import s from "./styles.module.scss";
import { MdOutlineCalendarToday, MdPhotoCamera } from "react-icons/md";

import { useAppContext } from "../../../context";
import { getImage, getUserImages } from "../../../api";
import ImagesGrid from "../../ImgGrid";
import { Spinner } from "../../../UI/Loading";
import useMatch from "../../../hooks/useMatch";
import RenderIf from "../../../utils/RenderIf";
import DownloadImage from "../../../utils/DownloadImageuns";
import { dateFormat, numberFormat } from "../../../utils/Helpers";

const Image = () => {
  const { modalProps, modalRef, closeModal } = useAppContext();
  const [image, setImage] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const match = useMatch("(max-width: 768px)");

  const { data } = modalProps;
  const { views, downloads, user, created_at, urls, exif } = image;

  useEffect(() => {
    setLoading(true);
    getImage(data?.id)
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
    getUserImages(user?.username)
      .then((res) => {
        setRelated(res);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => setRelated([]);
  }, [user?.username]);

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
              src={user?.profile_image?.small}
              alt={user?.name}
              effect='blur'
            />
          </div>
          <Link to={`/${user?.username}`} onClick={closeModal}>
            {user?.name}
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
            {isDownloading
              ? "Sudah di copy dan Download"
              : "Copy Link Image dan Download"}
          </a>
        </div>
      </div>

      <div className={clsx(s.modal_body, { [s.full_image]: isZooming })}>
        <Spinner loading={loading}>
          <LazyLoadImage
            src={urls?.regular}
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
            <RenderIf isTrue={views} isFalse='--'>
              <span>{numberFormat(views)}</span>
            </RenderIf>
          </div>
          <div className={s.first_row_item}>
            <h3>Downloads</h3>
            <RenderIf isTrue={downloads} isFalse='--'>
              <span>{numberFormat(downloads)}</span>
            </RenderIf>
          </div>
        </div>

        <div className={s.second_row}>
          <div className={s.second_row_item}>
            <MdOutlineCalendarToday />
            <RenderIf isTrue={created_at} isFalse='--'>
              <div>Published on {dateFormat(created_at)}</div>
            </RenderIf>
          </div>
          <RenderIf isTrue={exif?.name}>
            <div className={s.second_row_item}>
              <MdPhotoCamera />
              <div>{exif?.name}</div>
            </div>
          </RenderIf>
        </div>
      </div>

      <RenderIf isTrue={related}>
        <div className={s.related_images}>
          <h2>Related photos</h2>
          <ImagesGrid images={related} />
        </div>
      </RenderIf>
    </div>
  );
};

export default Image;
