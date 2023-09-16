import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  FlightCard  from '../FlightCard/FlightCard';

const FlightTable = ({ searchData }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [openRowIndex, setOpenRowIndex] = useState(null);

  useEffect(() => {
    if (searchData) {
      setLoading(true);
      console.log(searchData.departureAirport);
      
      setTimeout(() => {
        // API'ya filtreleme parametreleri ile yeni bir istek yap
        axios.get(`http://localhost:3000/api/flightsData?departureAirport=${searchData.departureAirport}&arrivalAirport=${searchData.arrivalAirport}`)
          .then((response) => {
            setFlights(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            setLoading(false);
          });
      }, 1000);
    }
  }, [searchData]);

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortKey === null) return 0;
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Flight List</h1>
          <div className="flex space-x-4 mb-4">
            <button onClick={() => setSortKey('departureTime')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sort by Departure Time
            </button>
            <button onClick={() => setSortKey('arrivalTime')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sort by Arrival Time
            </button>
            <button onClick={() => setSortKey('duration')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sort by Duration
            </button>
            <button onClick={() => setSortKey('price')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sort by Price
            </button>
          </div>
          <div>
            {sortedFlights.map((flight, index) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                index={index}
                openRowIndex={openRowIndex}
                setOpenRowIndex={setOpenRowIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FlightTable;