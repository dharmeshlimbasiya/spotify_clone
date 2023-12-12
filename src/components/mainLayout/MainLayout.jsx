import React from "react";
import Header from "../common/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
