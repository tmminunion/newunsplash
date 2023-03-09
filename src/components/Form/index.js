import React, { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import s from "./styles.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

import { useAppContext } from "../../context";

import RenderIf from "../../utils/RenderIf";

const Form = ({ isNavbarForm }) => {
  const { recent, setRecent } = useAppContext();
  const history = useNavigate();
  const [value, setValue] = useState("");

  const inputRef = useRef(null);

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
    }
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
          style={{ paddingRight: value ? 50 : 20 }}
        />
      </div>
    </form>
  );
};

export default Form;
