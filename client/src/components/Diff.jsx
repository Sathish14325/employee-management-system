import React from "react";

const Diff = () => {
  return (
    <div className="diff aspect-[16/9]">
      <div className="diff-item-1">
        <div className="bg-primary text-primary-content grid place-content-center text-lg md:text-4xl lg:text-8xl font-black">
          Employee
        </div>
      </div>
      <div className="diff-item-2">
        <div className="bg-base-200 grid place-content-center text-lg md:text-4xl lg:text-8xl font-black">
          Employee
        </div>
      </div>
      <div className="diff-resizer"></div>
    </div>
  );
};

export default Diff;
