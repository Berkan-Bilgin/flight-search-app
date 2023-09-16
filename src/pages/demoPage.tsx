import React, { useState } from "react";

export default function Deneme() {
  const [position, setPosition] = useState("2%");


  return (
    <>
      <div className="bg-gray-300 h-12 border-2 border-gray-400 flex justify-around w-96 text-white mx-auto mt-16 rounded-xl relative overflow-hidden">
        <h1
          style={{ left: position, transition: "left 0.5s ease-in-out" }}
          className={`h-auto top-1 bottom-1 absolute w-1/2 border-2 border-red-900 rounded-lg text-black`}
        ></h1>
        <button onClick={() => setPosition("2%")} className="p-2 px-12">
          Tek Yön
        </button>
        <button onClick={() => setPosition("48%")} className="p-2 px-12">
          Gidiş Dönüş
        </button>
      </div>    
    </>
  );
}

// const [toggle, setToggle] = useState(false);


  {/* <div style={{ position: 'relative', height: '50px', width: '200px', backgroundColor: 'gray' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className="p-3">a</h1>
        <h2 className="p-3">b</h2>
      </div>
      <div
        onClick={() => setToggle(!toggle)}
        style={{
          position: 'absolute',
          top: '10px',
          bottom: '10px',
          left: toggle ? '10px' : '90px',  // 200px (dış kutu genişliği) - 100px (iç kutu genişliği) - 10px (sağdan boşluk) = 90px
          width: '50%', // 200px * 0.5 = 100px
          backgroundColor: 'transparent',
          border: '1px solid red',  // Şeffaf olduğu için bir sınır ekledim
          transition: 'left 0.5s ease-in-out'
        }}
      >
        İç Kutu
      </div>
    </div> */}