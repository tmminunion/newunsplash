import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import s from "./styles.module.scss";

import { getCollection } from "../../api";
import ImagesGrid from "../../components/ImgGrid";
import PageTitle from "../../utils/PageTitle";

const Collection = () => {
  const { id, name } = useParams();
  const [collectionImages, setCollectionImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState({});

  useEffect(() => {
    getCollection(id)
      .then((res) => {
        setCollectionImages(res);
        setBackgroundImage(res[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <PageTitle title={name}>
      <div>
        <div className={s.collection_bg}>
          <img
            src={backgroundImage?.urls?.regular}
            alt={backgroundImage?.description}
          />
        </div>
        <div className='container'>
          <div className={s.collection_name}>
            <h1>{name}</h1>
          </div>
        </div>

        <ImagesGrid images={collectionImages} />
      </div>
    </PageTitle>
  );
};

export default Collection;
