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
import findItemById from "../../utils/TranslateTag";

const Image = memo(({ id, tag_id, filepath, low, description }) => {
  const { openModal, modalProps } = useAppContext();
  const match = useMatch("(max-width: 768px)");
  const isImageModal = modalProps.type === "imageModal";

  const handleOpenModal = (id) => {
    openModal({
      type: "imageModal",
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
          <Link to={`/t/${tag_id}`} onClick={(e) => e.stopPropagation()}>
            <div className={s.user_image}>
              <LazyLoadImage
                src={`https://wabot.nufat.id/img/${id}/thumb/32/32`}
                effect='blur'
                width={32}
                height={32}
                alt='nuf12344'
              />
            </div>
            <h3>{findItemById(tag_id)}</h3>
          </Link>
        </div>
      </RenderIf>

      <div
        onClick={match ? () => handleOpenModal(id) : () => {}}
        className={`${s.image} image`}
      >
        <LazyLoadImage
          src={`https://wabot.nufat.id/img/${id}/thumb/500/500`}
          alt={description}
          effect='blur'
          placeholderSrc={low}
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
