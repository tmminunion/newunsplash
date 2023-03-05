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
import { faker } from "@faker-js/faker";

const Image = memo(({ id, album_title, filepath, description, type }) => {
  const { openModal, modalProps } = useAppContext();
  const match = useMatch("(max-width: 768px)");
  const isImageModal = modalProps.type === "imageModal";

  const handleOpenModal = (id, type) => {
    openModal({
      type: type,
      data: { id: id },
    });
  };

  return (
    <div className={s.image_wrapper}>
      <RenderIf isTrue={!isImageModal || !match}>
        <div
          className={s.user_wrapper}
          onClick={match ? () => {} : () => handleOpenModal(id, type)}
        >
          <Link to={`/t/${album_title}`} onClick={(e) => e.stopPropagation()}>
            <div className={s.user_image}>
              <LazyLoadImage
                src={faker.image.avatar()}
                effect='blur'
                width={32}
                height={32}
                alt='nufat12344'
              />
            </div>
            <h3>{album_title}</h3>
          </Link>
        </div>
      </RenderIf>

      <div
        onClick={match ? () => handleOpenModal(id, type) : () => {}}
        className={`${s.image} image`}
      >
        <LazyLoadImage
          src={filepath}
          alt={description}
          effect='blur'
          placeholderSrc={filepath}
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
