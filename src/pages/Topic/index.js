import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./styles.module.scss";

import { getTopic, getTopicImages } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import { LinearProgress } from "../../UI/Loading";
import RenderIf from "../../utils/RenderIf";
import PageTitle from "../../utils/PageTitle";

const Topic = () => {
  const { slug } = useParams();
  const [topic, setTopic] = useState({});
  const [topicImages, setTopicImages] = useState([]);
  const [bgImageLoading, setBgImageLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);

  const { title, description, cover_photo } = topic;

  useEffect(() => {
    setBgImageLoading(true);
    getTopic(slug)
      .then((res) => {
        setTopic(res);
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
    getTopicImages(slug)
      .then((res) => {
        setTopicImages(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setImagesLoading(false);
      });
  }, [slug]);

  return (
    <PageTitle title={title}>
      <div className={s.topic_outer}>
        <div className={s.topic_bg}>
          <RenderIf isTrue={!bgImageLoading}>
            <LazyLoadImage
              src={cover_photo?.urls?.full}
              alt={title}
              effect="blur"
              placeholderSrc={cover_photo?.urls?.small}
            />
          </RenderIf>
          <div className={s.background_layout} />
        </div>
        <div className={s.topic_inner}>
          <div className={s.topic_content}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
        <div className={s.topic_user}>
          <p>Photo by</p>
          <Link to={`/${cover_photo?.user.username}`}>
            {cover_photo?.user.name}
          </Link>
        </div>
      </div>

      <LinearProgress loading={imagesLoading}>
        <ImagesGrid images={topicImages} />
      </LinearProgress>
    </PageTitle>
  );
};

export default Topic;
