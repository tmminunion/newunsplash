import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import s from "./styles.module.scss";
import { MdCheck } from "react-icons/md";

import { useAppContext } from "../../../context";
import RenderIf from "../../../utils/RenderIf";
import { orientationData, sortData } from "../../../utils/FiltersData";

const Orientation = memo(({ value, title, orientation, setOrientation }) => {
  const selected = orientation === value;
  const orientationIcon = `orientation orientation__${value}`;

  const handleOrientation = (value) => {
    setOrientation(value);
  };

  return (
    <li className={s.filter_item}>
      <button
        className={clsx(s.filter_button, { selected: selected })}
        onClick={() => handleOrientation(value)}
      >
        <RenderIf isTrue={selected}>
          <MdCheck />
        </RenderIf>
        <RenderIf isTrue={value}>
          <div className={orientationIcon} />
        </RenderIf>
        {title}
      </button>
    </li>
  );
});

const Sort = memo(({ value, title, sort, setSort }) => {
  const selected = sort === value;

  const handleSort = (value) => {
    setSort(value);
  };

  return (
    <li className={s.filter_item}>
      <button
        className={clsx(s.filter_button, { selected: selected })}
        onClick={() => handleSort(value)}
      >
        <RenderIf isTrue={selected}>
          <MdCheck />
        </RenderIf>
        {title}
      </button>
    </li>
  );
});

const Filter = () => {
  const history = useNavigate();
  const { modalProps, closeModal } = useAppContext();
  const { data } = modalProps;
  const [orientation, setOrientation] = useState(data?.orientation);
  const [sort, setSort] = useState(data?.sort);

  const handleClear = () => {
    history(`/p/${data?.name}/relevant`);
    closeModal();
  };

  const handleRoute = () => {
    history(`/p/${data?.name}/${sort}${orientation ? `/${orientation}` : ""}`);
    closeModal();
  };

  return (
    <div className={s.filter_outer}>
      <div className={s.filter_inner}>
        <div className={s.filter}>
          <h3>Orientation</h3>
          <ul className={s.filter_list}>
            {orientationData.map((el, i) => (
              <Orientation
                key={i}
                {...el}
                orientation={orientation}
                setOrientation={setOrientation}
              />
            ))}
          </ul>
        </div>
        <div className={s.filter}>
          <h3>Sort</h3>
          <ul className={s.filter_list}>
            {sortData.map((el, i) => (
              <Sort key={i} {...el} sort={sort} setSort={setSort} />
            ))}
          </ul>
        </div>
      </div>
      <div className={s.filter_footer}>
        <button
          className={s.clear_button}
          onClick={handleClear}
          disabled={!orientation && sort !== "latest"}
        >
          Clear
        </button>
        <button className={s.close_button} onClick={handleRoute}>
          {orientation || sort !== "relevant" ? "Apply" : "Close"}
        </button>
      </div>
    </div>
  );
};

export default Filter;
