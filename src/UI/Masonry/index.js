import React from "react";
import clsx from "clsx";

import s from "./styles.module.scss";
import { useAppContext } from "../../context";

const Masonry = ({ children }) => {
  const { modalProps } = useAppContext();

  const getColumns = () => {
    const columns = Array.from({ length: 3 }, () => []);

    React.Children.forEach(children, (child, index) => {
      if (child && React.isValidElement(child)) {
        columns[index % 3].push(child);
      }
    });

    return columns;
  };

  const renderColumns = () => {
    return getColumns().map((el, i) => (
      <div
        key={i}
        className={clsx(s.masonry_column, {
          [s.masonry_column_modal]: modalProps.type === "imageModal",
        })}
      >
        {el.map((item) => item)}
      </div>
    ));
  };

  return (
    <div
      className={clsx(s.masonry_block, {
        [s.masonry_block_modal]: modalProps.type === "imageModal",
      })}
    >
      {renderColumns()}
    </div>
  );
};

export default Masonry;
