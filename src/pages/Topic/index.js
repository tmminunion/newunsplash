import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { faker } from "@faker-js/faker";
import s from "./styles.module.scss";
import Modal from "@mui/material/Modal";
import { getTopic, getbyTAG } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import { LinearProgress } from "../../UI/Loading";
import RenderIf from "../../utils/RenderIf";
import PageTitle from "../../utils/PageTitle";
import Modaluplod from "../../components/Modals/Upload";
import findItemById from "../../utils/TranslateTag";
const Topic = () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState({});
  const [topicImages, setTopicImages] = useState([]);
  const [bgImageLoading, setBgImageLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { title, description, cover_photo } = topic;

  useEffect(() => {
    setBgImageLoading(true);
    getTopic(slug)
      .then((res) => {
        // setTopic(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setBgImageLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    setImagesLoading(true);
    getbyTAG(slug, 1)
      .then((res) => {
        setTopicImages(res.data);
        localStorage.setItem("bgtopik", res.data[0].filepath);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setImagesLoading(false);
      });
  }, [slug]);
  const imgbg = (() => {
    if (localStorage.getItem("bgtopik")) {
      return localStorage.getItem("bgtopik");
    } else {
      return faker.image.abstract();
    }
  })();
  return (
    <PageTitle title={title}>
      <div className={s.topic_outer}>
        <div className={s.topic_bg}>
          <RenderIf isTrue={!bgImageLoading}>
            <LazyLoadImage
              src={imgbg}
              alt={title}
              effect='blur'
              placeholderSrc={imgbg}
            />
          </RenderIf>
          <div className={s.background_layout} />
        </div>
        <div className={s.topic_inner}>
          <div className={s.topic_content}>
            <h1>{findItemById(slug)}</h1>
            <div className={s.vertical_center}>
              <button onClick={handleOpen} className={s.buttonnya}>
                Upload Foto
              </button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Modaluplod></Modaluplod>
            </Modal>{" "}
          </div>
        </div>
      </div>

      <LinearProgress loading={imagesLoading}>
        <ImagesGrid images={topicImages} />
      </LinearProgress>
    </PageTitle>
  );
};

export default Topic;
