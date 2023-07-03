import React from "react";
import "./Loader.scss";
// import "../../App.scss";
interface LoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, children }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="wrap-loader">
      <div className="flex">
        <div className="loader"></div>
      </div>
      <div className="load-text"><p>Loading...</p></div>
      {children}
    </div>
  );
};

export default Loader;
