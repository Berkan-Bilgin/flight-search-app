import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useFetchFlightsData } from '@/hooks/useFetchFlightsData';
import useFetchAirports from '@/hooks/useFetchAirports';

export default function SelectDemoPage() {
  const { airportOptions } = useFetchAirports();
  const { flights } = useFetchFlightsData();
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [arrivalOptions, setArrivalOptions] = useState([]);

  function changeAirports() {
    const temp = selectedDeparture;
    setSelectedDeparture(selectedArrival);
    setSelectedArrival(temp);
  }

  useEffect(() => {
    if (selectedDeparture) {
      const filteredFlights = flights.filter(
        (flight) => flight.departureAirportCode === selectedDeparture.value
      );

      const uniqueArrivalAirports = Array.from(
        new Set(filteredFlights.map((flight) => flight.arrivalAirportCode))
      );

      const newArrivalOptions = uniqueArrivalAirports.map((code) => {
        const flight = filteredFlights.find((flight) => flight.arrivalAirportCode === code);
        return {
          value: flight.arrivalAirportCode,
          label: flight.arrivalAirport,
        };
      });

      setArrivalOptions(newArrivalOptions);
      console.log("selected",selectedDeparture,"arrival",arrivalOptions)
    }
  }, [selectedDeparture, flights]);

  return (
    <div>
      <h1>Select Demo Page</h1>
      <div className="select-container">
        <div className="select-item">
          <label>Departure Airport</label>
          <Select
            options={airportOptions}
            placeholder="Select an airport..."
            onChange={(option) => setSelectedDeparture(option)}
            value={selectedDeparture}
          />
        </div>
        <div>
            <button onClick={changeAirports} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Değiştir
            </button>
        </div>
        <div className="select-item">
          <label>Arrival Airport</label>
          <Select
            options={arrivalOptions}
            placeholder="Select an airport..."
            isDisabled={!selectedDeparture}
            onChange={(option) => setSelectedArrival(option)}
            value={selectedArrival}
          />
        </div>
      </div>
    </div>
  );
}