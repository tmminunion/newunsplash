import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";

import s from "./styles.module.scss";
import { MdPhoto } from "react-icons/md";
import { IoEarth, IoLocationSharp } from "react-icons/io5";
import {
  AiFillCheckCircle,
  AiOutlineInstagram,
  AiOutlineLink,
  AiOutlineTwitter,
} from "react-icons/ai";

import { getUserImages, getUserInfo } from "../../api";
import ImagesGrid from "../../components/ImgGrid";
import Dropdown from "../../UI/Dropdown";
import { Spinner } from "../../UI/Loading";
import RenderIf from "../../utils/RenderIf";
import PageTitle from "../../utils/PageTitle";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);

  const {
    profile_image,
    first_name,
    last_name,
    location,
    tags,
    for_hire,
    social,
    bio,
  } = user;

  const socials = [
    {
      title: "Website",
      username: social?.portfolio_url,
      url: social?.portfolio_url,
      icon: <IoEarth />,
    },
    {
      title: "Instagram",
      username: social?.instagram_username,
      url: `https://instagram.com/${social?.instagram_username}`,
      icon: <AiOutlineInstagram />,
    },
    {
      title: "Twitter",
      username: social?.twitter_username,
      url: `https://twitter.com/${social?.twitter_username}`,
      icon: <AiOutlineTwitter />,
    },
  ];

  useEffect(() => {
    setUserLoading(true);
    getUserInfo(username)
      .then((resp) => {
        setUser(resp);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUserLoading(false);
      });
    return () => setUser({});
  }, [username]);

  useEffect(() => {
    setImagesLoading(true);
    getUserImages(username)
      .then((response) => {
        setImages(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setImagesLoading(false);
      });
    return () => setImages([]);
  }, [username]);

  const handleClick = (url) => {
    if (url) {
      window.open(url);
    }
  };

  const isSocial =
    social?.portfolio_url ||
    social?.instagram_username ||
    social?.twitter_username;

  return (
    <PageTitle title={username ? `${username}` : "Loading"}>
      <div className={s.user_outer}>
        <div className='container'>
          <div className={s.user_inner}>
            <Spinner loading={userLoading}>
              <div className={s.user_image_wrapper}>
                <div className={s.user_image}>
                  <img src={profile_image?.large} alt={first_name} />
                </div>
              </div>
              <div className={s.user_info}>
                <div className={s.name}>
                  {first_name}&nbsp;{last_name}
                </div>
                <div className={s.bio}>
                  {bio
                    ? bio
                    : `Download free, beautiful high-quality photos curated by ${first_name}.`}
                </div>
                <div className={s.user_items}>
                  <RenderIf isTrue={for_hire}>
                    <div className={clsx(s.user_item, s.available)}>
                      <div className={s.icon}>
                        <AiFillCheckCircle />
                      </div>
                      Available for hire
                    </div>
                  </RenderIf>
                  <RenderIf isTrue={location}>
                    <div className={s.user_item}>
                      <div className={s.icon}>
                        <IoLocationSharp />
                      </div>
                      {location}
                    </div>
                  </RenderIf>
                  <RenderIf isTrue={isSocial}>
                    <div className={s.user_item}>
                      <div className={s.icon}>
                        <AiOutlineLink />
                      </div>
                      <Dropdown title={`Connect with ${first_name}`}>
                        {socials.map((social, i) => {
                          return (
                            <RenderIf key={i} isTrue={social.username}>
                              <button onClick={() => handleClick(social.url)}>
                                {social.icon}
                                {social.title}
                              </button>
                            </RenderIf>
                          );
                        })}
                      </Dropdown>
                    </div>
                  </RenderIf>
                </div>
                <RenderIf isTrue={tags?.custom?.length}>
                  <div className={s.user_interest}>
                    <div>Interests</div>
                    <div className={s.user_tags}>
                      {tags?.custom?.map((tag, i) => {
                        return (
                          <Link to={`/p/${tag.title}/relevant`} key={i}>
                            {tag.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </RenderIf>
              </div>
            </Spinner>
          </div>
        </div>
      </div>

      <div className={s.tabs_outer}>
        <div className={s.tabs_inner}>
          <div className={s.tab}>
            <MdPhoto />
            <div>Photos</div>
          </div>
        </div>
      </div>

      <ImagesGrid images={images} loading={imagesLoading} />
    </PageTitle>
  );
};

export default User;
