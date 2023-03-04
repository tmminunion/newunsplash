import React, { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import s from "./styles.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

import { useAppContext } from "../../context";
import useClickAway from "../../hooks/useClickAway";
import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/RenderIf";

const Panel = memo(({ isOpenPanel, setIsOpenPanel }) => {
  const { recent, setRecent } = useAppContext();
  const history = useNavigate();
  const noDuplicates = [...new Set(recent)];
  const newRecent = noDuplicates.slice(Math.max(noDuplicates.length - 5, 0));
  const match = useMatch("(min-width: 768px)");

  const handleClear = () => {
    localStorage.removeItem("recent");
    setRecent([]);
  };

  const handleClick = (value) => {
    history(`/p/${value}/relevant`);
    setIsOpenPanel(false);
  };

  return (
    <RenderIf isTrue={match}>
      <div
        className={clsx(s.panel, {
          [s.show]: isOpenPanel && newRecent.length,
        })}
      >
        <div className={s.panel_items}>
          <div className={s.panel_title}>
            <span>Recent Searches</span>
            <span>•</span>
            <button type='button' onClick={handleClear}>
              Clear
            </button>
          </div>
          <div className={s.recent}>
            {newRecent?.map((recent, i) => {
              return (
                <button
                  type='button'
                  key={i}
                  className={s.recent_button}
                  onClick={() => {
                    handleClick(recent);
                  }}
                >
                  {recent}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </RenderIf>
  );
});

const Form = ({ isNavbarForm }) => {
  const { recent, setRecent } = useAppContext();
  const history = useNavigate();
  const [value, setValue] = useState("");
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const inputRef = useRef(null);

  useClickAway(inputRef, () => {
    setIsOpenPanel(false);
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      if (recent.indexOf(value) === -1) {
        setRecent([...recent, value]);
      }
      history(`/p/${value}/relevant`);
      setIsOpenPanel(false);
    }
  };

  const handleOpenPanel = () => {
    setIsOpenPanel(true);
  };

  return (
    <form
      className={clsx(s.form_outer, {
        [s.navbar_form_outer]: isNavbarForm,
      })}
      onSubmit={handleSubmit}
      ref={inputRef}
    >
      <div
        className={clsx(s.form_inner, {
          [s.navbar_form_inner]: isNavbarForm,
        })}
      >
        <button type='submit' className={clsx(s.form_icon, s.search_icon)}>
          <AiOutlineSearch />
        </button>
        <input
          type='text'
          placeholder='Cari photo disini....'
          value={value}
          onChange={handleChange}
          onClick={handleOpenPanel}
          style={{ paddingRight: value ? 50 : 20 }}
        />
        <RenderIf isTrue={value}>
          <button
            className={clsx(s.form_icon, s.clear_icon)}
            onClick={() => setValue("")}
          >
            <MdOutlineClose />
          </button>
        </RenderIf>
      </div>

      <Panel isOpenPanel={isOpenPanel} setIsOpenPanel={setIsOpenPanel} />
    </form>
  );
};

export default Form;
