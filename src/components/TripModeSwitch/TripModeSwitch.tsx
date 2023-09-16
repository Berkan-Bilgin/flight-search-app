import React, { useState } from 'react';

const TripModeSwitch = ({ setFieldValue }) => {
  const [position, setPosition] = useState("1%");

  return (
    <div className="bg-gray-300 h-12 border-2 border-gray-400 flex justify-around w-96 text-white mx-auto rounded-xl relative overflow-hidden">
      <h1
        style={{ left: position, transition: "left 0.5s ease-in-out" }}
        className={`h-auto top-1 bottom-1 absolute w-1/2 border-2 border-red-900 rounded-lg text-black`}
      ></h1>
      <button
        type='button'
        onClick={() => {
          setPosition("1%");
          setFieldValue('oneWay', true);
        }}
        className="p-2 px-12"
      >
        Tek Yön
      </button>
      <button
        type='button'
        onClick={() => {
          setPosition("49%");
          setFieldValue('oneWay', false);
        }}
        className="p-2 px-12"
      >
        Gidiş Dönüş
      </button>
    </div>
  );
};

export default TripModeSwitch;