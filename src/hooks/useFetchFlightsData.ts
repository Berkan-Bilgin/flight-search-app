import axios from "axios";
import { useState, useEffect } from "react";


export const useFetchFlightsData = () => {
  const [flights, setFlights] = useState([]);
  const [departureAirport, setDepartureAirport] = useState([]);
  const [arrivalOptions, setArrivaltOptions] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('/api/flightsData');
        console.log('Fetched flight data:', response.data);
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlights();
  }, []);

  return {flights}

}
