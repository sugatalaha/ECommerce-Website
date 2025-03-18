import React from "react";

export const Title = ({ text1, text2 }) => {
  return (
    <>
      <p className="text-3xl font-bold prata-regular">
        {text1} <span className="text-4xl text-gray-700 font-semibold">{text2}</span>
      </p>
      <br/>
    </>
  );
};
