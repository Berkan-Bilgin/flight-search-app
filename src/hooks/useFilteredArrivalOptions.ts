import { useEffect, useState } from 'react';

const useFilteredArrivalOptions = (selectedDeparture, flights) => {
  const [arrivalOptions, setArrivalOptions] = useState([]);

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
    }
  }, [selectedDeparture, flights]);

  return arrivalOptions;
};
