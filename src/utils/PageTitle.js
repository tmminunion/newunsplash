import { useEffect } from "react";

const PageTitle = ({ children, title }) => {
  useEffect(() => {
    document.title = `${title ? title : "Loading"} | BT-photo`;
  }, [title]);

  return <>{children}</>;
};

export default PageTitle;
