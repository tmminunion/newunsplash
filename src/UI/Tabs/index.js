import React, { memo } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import s from "./styles.module.scss";
import { MdPhoto, MdPhotoLibrary, MdSupervisorAccount } from "react-icons/md";

import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/RenderIf";

const tabs = [
  {
    icon: <MdPhoto />,
    title: "Photos",
    value: "p",
  },
  {
    icon: <MdPhotoLibrary />,
    title: "Collections",
    value: "c",
  },
  {
    icon: <MdSupervisorAccount />,
    title: "Users",
    value: "u",
  },
];

const Tabs = memo(({ name, tab, children }) => {
  const match = useMatch("(min-width: 768px)");

  const link = (value) => {
    const isPhotos = `/p/${name}/relevant`;
    const isCollections = `/${value}/${name}`;
    const isUsers = `/${value}/${name}`;

    if (value === "p") {
      return isPhotos;
    } else if (value === "c") {
      return isCollections;
    } else if (value === "u") {
      return isUsers;
    }
  };

  return (
    <div className={s.tabs_outer}>
      <div className={s.tabs_inner}>
        {tabs.map((el, i) => {
          return (
            <Link
              key={i}
              to={link(el.value)}
              className={clsx(s.tab, { [s.active]: el.value === tab })}
            >
              <RenderIf isTrue={match}>
                <div>{el.icon}</div>
              </RenderIf>
              <div>{el.title}</div>
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
});

export default Tabs;
