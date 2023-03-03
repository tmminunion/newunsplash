import { useEffect } from "react";

const PageTitle = ({ children, title }) => {
  useEffect(() => {
    document.title = `${title ? title : "Loading"} | Unsplash`;
  }, [title]);

  return <>{children}</>;
};

export default PageTitle;
