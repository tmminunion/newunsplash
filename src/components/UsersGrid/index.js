import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import s from "./styles.module.scss";
import Tabs from "../../UI/Tabs";
import { LinearProgress } from "../../UI/Loading";

const User = ({ id, profile_image, name, username, photos }) => {
  return (
    <div key={id} className={s.user}>
      <div className={s.header}>
        <div className={s.photo}>
          <img src={profile_image.medium} alt={username} />
        </div>
        <div className={s.info}>
          <div className={s.name}>{name}</div>
          <div className={s.username}>{username}</div>
        </div>
      </div>
      <div className={s.body}>
        {photos.map((photo) => {
          return (
            <div key={photo.id} className={s.image}>
              <LazyLoadImage src={photo.urls.small} alt='photo' effect='blur' />
            </div>
          );
        })}
      </div>
      <Link to={`/${username}`} className={s.link}>
        View profile
      </Link>
    </div>
  );
};

const UsersGrid = ({ name, users, loading }) => {
  return (
    <>
      <div className={s.tabs_wrapper}>
        <Tabs name={name} tab='u' />
      </div>
      <LinearProgress loading={loading}>
        <div className={s.users_outer}>
          <div className={s.users_container}>
            <h1>{name ? name : "Loading"}</h1>
            <div className={s.users_inner}>
              {users.map((user) => (
                <User key={user.id} {...user} />
              ))}
            </div>
          </div>
        </div>
      </LinearProgress>
    </>
  );
};

export default UsersGrid;
