import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./styles.module.scss";

import Tabs from "../../UI/Tabs";
import { LinearProgress } from "../../UI/Loading";

const Collection = ({
  id,
  title,
  preview_photos,
  total_photos,
  user,
  tags,
}) => {
  return (
    <div>
      <Link to={`/c/${id}/${title}`} className={s.collection_link}>
        <div className={s.collection}>
          {preview_photos.map((img) => {
            return (
              <div key={img.id} className={s.image}>
                <LazyLoadImage
                  src={img.urls.small}
                  alt={img.urls.id}
                  effect="blur"
                  placeholderSrc={img.urls.small}
                />
              </div>
            );
          })}
        </div>
      </Link>
      <div className={s.collection_title}>{title}</div>
      <div className={s.collection_owner}>
        {total_photos} photos · Curated by{" "}
        <Link to={`/${user.username}`}>{user.name}</Link>
      </div>
      <div className={s.collections_tags}>
        {tags.slice(0, 3).map((tag, i) => {
          return (
            <Link key={i} to={`/p/${tag.title}/relevant`}>
              {tag.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const CollectionsGrid = ({ name, collections, loading }) => {
  return (
    <>
      <div className={s.tabs_wrapper}>
        <Tabs name={name} tab="c" />
      </div>
      <LinearProgress loading={loading}>
        <div className={s.collections_outer}>
          <div className={s.collections_container}>
            <h1>{name ? name : "Loading"}</h1>
            <div className={s.collections_inner}>
              {collections.map((collection) => (
                <Collection key={collection.id} {...collection} />
              ))}
            </div>
          </div>
        </div>
      </LinearProgress>
    </>
  );
};

export default CollectionsGrid;
