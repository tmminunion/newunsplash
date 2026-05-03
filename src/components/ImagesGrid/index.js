import React, { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Heart, Maximize2 } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";
import s from "./styles.module.scss";
import { useAppContext } from "../../context";
import { LinearProgress } from "../../UI/Loading";
import Masonry from "../../UI/Masonry";
import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/RenderIf";
import findItemById from "../../utils/TranslateTag";
import Skeleton from "../../UI/Skeleton";

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
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className={s.image_card}
    >
      <div className={s.image_inner} onClick={() => handleOpenModal(id)}>
        <LazyLoadImage
          src={`https://wabot.nufat.id/img/${id}/thumb/500/500`}
          alt={description}
          effect='blur'
          placeholderSrc={low}
          className={s.main_img}
        />
        
        <div className={s.image_overlay}>
          <div className={s.overlay_top}>
            <button className={s.icon_btn} onClick={(e) => e.stopPropagation()}>
              <Heart size={18} />
            </button>
          </div>
          
          <div className={s.overlay_bottom}>
            <Link 
              to={`/t/${tag_id}`} 
              className={s.tag_link}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={s.tag_avatar}>
                 <img src={`https://wabot.nufat.id/img/${id}/thumb/32/32`} alt="tag" />
              </div>
              <span>{findItemById(tag_id)}</span>
            </Link>
            
            <button className={s.icon_btn} onClick={(e) => {
              e.stopPropagation();
              window.open(filepath, '_blank');
            }}>
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ImagesGrid = ({ name, images, loading = false }) => {
  const { modalProps } = useAppContext();
  const isImageModal = modalProps.type === "imageModal";

  return (
    <div className={clsx(s.images_container, { [s.modal_open]: isImageModal })}>
      <LinearProgress loading={loading}>
        <RenderIf isTrue={name}>
          <h1 className={s.grid_title}>{name ? name : "Loading..."}</h1>
        </RenderIf>
        {loading ? (
          <div className={s.skeleton_grid}>
            <Skeleton count={6} height="300px" />
          </div>
        ) : (
          <Masonry>
            {images.map((image) => (
              <Image key={image.id} {...image} />
            ))}
          </Masonry>
        )}
      </LinearProgress>
    </div>
  );
};

export default ImagesGrid;
