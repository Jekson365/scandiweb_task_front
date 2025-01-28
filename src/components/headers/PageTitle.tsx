import React from "react";

type PageTitle = {
  title?: string;
};

const PageTitle: React.FC<PageTitle> = ({ title }) => {
  return (
    <>
      <div className="header-title">{title || "clothes"}</div>
    </>
  );
};

export default PageTitle;
