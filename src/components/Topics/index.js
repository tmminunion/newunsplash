import React, { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import s from "./styles.module.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { getcatAPI } from "../../api";
import clsx from "clsx";

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  if (isFirstItemVisible) return null;

  return (
    <button
      onClick={() => scrollPrev()}
      className={clsx(s.arrow_button, s.arrow_left)}
    >
      <MdArrowBackIosNew />
    </button>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  if (isLastItemVisible) return null;

  return (
    <button
      onClick={() => scrollNext()}
      className={clsx(s.arrow_button, s.arrow_right)}
    >
      <MdArrowForwardIos />
    </button>
  );
};

const Topic = memo(({ id, slug, title }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const current_slug = pathname.slice(3, pathname.length);

  return (
    <div key={id} className={s.topic}>
      <Link
        to={`/t/${slug}`}
        className={slug === current_slug ? s.active_topic : ""}
      >
        {title}
      </Link>
    </div>
  );
});

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getcatAPI()
      .then((res) => {
        setTopics(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <div className={s.topics_wrapper}>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {topics.map((topic) => (
          <Topic key={topic.id} {...topic} />
        ))}
      </ScrollMenu>
    </div>
  );
};

export default Topics;
