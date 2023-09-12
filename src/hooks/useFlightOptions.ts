import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFlightOptions = () => {
  const [flightOptions, setFlightOptions] = useState([]);
  const [departureAirport, setDepartureAirport] = useState(null);

  useEffect(() => {
    const fetchFlightOptions = async () => {
      try {
        const response = await axios.get('/api/flightsData');
        setFlightOptions(response.data);
      } catch (error) {
        console.error('Error fetching flight options:', error);
      }
    };

    fetchFlightOptions();
  }, []);

 

  const uniqueArrivalAirports = Array.from(
    new Set(
      flightOptions
        .filter(flight => flight.departureAirport.startsWith(departureAirport))
        .map(flight => flight.arrivalAirport)
    )
  );

  const arrivalOptions = uniqueArrivalAirports.map(airport => ({
    value: airport.substring(0, 3),  // First 3 characters of airport code
    label: airport,
  }));

  console.log(departureAirport)
  console.log(arrivalOptions)

  return { setDepartureAirport, arrivalOptions };
};