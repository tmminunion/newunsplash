import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import s from "./styles.module.scss";
import { MdCheck, MdTune } from "react-icons/md";
import { faker } from "@faker-js/faker";
import { useAppContext } from "../../context";
import { getCARI, getSearchImages } from "../../api";
import ImagesGrid from "../../components/CommonGrid";
import Tabs from "../../UI/Tabs";
import Dropdown from "../../UI/Dropdown";
import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/RenderIf";
import PageTitle from "../../utils/PageTitle";
import { orientationData, sortData } from "../../utils/FiltersData";

const SearchImages = () => {
  const { name, orientation, sort } = useParams();
  const history = useNavigate();
  const { openModal } = useAppContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const match = useMatch("(min-width: 768px)");

  const orientationTitle = orientationData.find(
    (el) => orientation === el.value
  );
  const sortTitle = sortData.find((el) => sort === el.value);

  const handleClick = (url) => {
    history(url);
  };

  useEffect(() => {
    setLoading(true);
    var dataimg = [];

    getCARI(name, sort).then((response) => {
      for (let result of response.data) {
        dataimg.push({
          id: result.id,
          imgid: result.imgid,
          album_id: result.album_id,
          album_title: result.album_title,
          filepath: result.filepath,
          height: result.height,
          width: result.width,
          uploaded_date: result.created_at,
          type: "imageModal",
        });
      }
    });
    getSearchImages(name, sort, orientation)
      .then((response) => {
        for (let result of response.results) {
          dataimg.push({
            id: result.id,
            imgid: result.id,
            album_id: 1,
            album_title: faker.word.adverb(),
            filepath: result.urls.regular,
            height: result.height,
            width: result.width,
            uploaded_date: result.created_at,
            type: "UnsplashModal",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dataimg.sort((a, b) => 0.5 - Math.random());

        setImages(dataimg);
        setLoading(false);
      });

    return () => {
      setImages([]);
    };
  }, [name, sort]);

  const handleOpenModal = () => {
    openModal({
      type: "filterModal",
      data: { name: name, orientation: orientation, sort: sort },
    });
  };

  return (
    <PageTitle title={`${name ? name : "Loading"}`}>
      <div className={s.tabs_wrapper}>
        <Tabs name={name} tab='p'>
          <RenderIf isTrue={match}>
            <div className={s.filters}>
              <Dropdown title={orientationTitle?.title}>
                {orientationData.map((el, i) => {
                  const selected = orientation === el.value;
                  const url = `/p/${name}/${sort}${
                    el.value ? `/${el.value}` : ""
                  }`;
                  const orientationIcon = `orientation orientation__${el.value}`;

                  return (
                    <button
                      key={i}
                      className={selected ? "selected" : ""}
                      onClick={() => handleClick(url)}
                    >
                      <RenderIf isTrue={selected}>
                        <MdCheck />
                      </RenderIf>
                      <RenderIf isTrue={el.value}>
                        <div className={orientationIcon} />
                      </RenderIf>
                      {el.title}
                    </button>
                  );
                })}
              </Dropdown>
              <Dropdown title={`Sort by ${sortTitle.title}`}>
                {sortData.map((el, i) => {
                  const selected = sort === el.value;
                  const url = `/p/${name}/${el.value}${
                    orientation ? `/${orientation}` : ""
                  }`;

                  return (
                    <button
                      key={i}
                      className={selected ? "selected" : ""}
                      onClick={() => handleClick(url)}
                    >
                      <RenderIf isTrue={selected}>
                        <MdCheck />
                      </RenderIf>
                      {el.title}
                    </button>
                  );
                })}
              </Dropdown>
            </div>
          </RenderIf>

          <RenderIf isTrue={!match}>
            <button className={s.filters_button} onClick={handleOpenModal}>
              <MdTune />
            </button>
          </RenderIf>
        </Tabs>
      </div>

      <ImagesGrid name={name} images={images} loading={loading} />
    </PageTitle>
  );
};

export default SearchImages;
