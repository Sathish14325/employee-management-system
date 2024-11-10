import React from "react";
import Diff from "../components/Diff";

const HomeScreen = () => {
  return (
    <div>
      <div className="w-full text-center my-20 sm:my-40 md:my-50 lg:my-80">
        <h1 className="text-5xl font-bold">Welcome to Employees Hub</h1>
      </div>
      <div>
        <Diff />
      </div>
    </div>
  );
};

export default HomeScreen;
