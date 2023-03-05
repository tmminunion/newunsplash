import React, { memo } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";

import s from "./styles.module.scss";

import { useAppContext } from "../../context";
import { LinearProgress } from "../../UI/Loading";
import Masonry from "../../UI/Masonry";
import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/RenderIf";

const Image = memo(({ id, user, urls, description }) => {
  const { openModal, modalProps } = useAppContext();
  const match = useMatch("(max-width: 768px)");
  const isImageModal = modalProps.type === "imageModal";

  const handleOpenModal = (id) => {
    openModal({
      type: "UnsplashModal",
      data: { id: id },
    });
  };

  return (
    <div className={s.image_wrapper}>
      <RenderIf isTrue={!isImageModal || !match}>
        <div
          className={s.user_wrapper}
          onClick={match ? () => {} : () => handleOpenModal(id)}
        >
          <Link to={`/${user.username}`} onClick={(e) => e.stopPropagation()}>
            <div className={s.user_image}>
              <LazyLoadImage
                src={user.profile_image.small}
                effect='blur'
                width={32}
                height={32}
                alt={user.name}
              />
            </div>
            <h3>{user.name}</h3>
          </Link>
        </div>
      </RenderIf>

      <div
        onClick={match ? () => handleOpenModal(id) : () => {}}
        className={`${s.image} image`}
      >
        <LazyLoadImage
          src={urls.regular}
          alt={description}
          effect='blur'
          placeholderSrc={urls.small}
        />
      </div>
    </div>
  );
});

const ImagesGrid = ({ name, images, loading = false }) => {
  const { modalProps } = useAppContext();
  const isImageModal = modalProps.type === "imageModal";

  return (
    <div className={clsx(s.images, { [s.images_padding]: isImageModal })}>
      <div className='container'>
        <LinearProgress loading={loading}>
          <RenderIf isTrue={name}>
            <h1>{name ? name : "Loading..."}</h1>
          </RenderIf>
          <Masonry>
            {images.map((image) => (
              <Image key={image.id} {...image} />
            ))}
          </Masonry>
        </LinearProgress>
      </div>
    </div>
  );
};

export default ImagesGrid;
