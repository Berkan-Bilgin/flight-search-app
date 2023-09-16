import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAirports = () => {
  const [airportOptions, setAirportOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get('/api/airportsOptions');
        setAirportOptions(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchAirports();
  }, []);

  return { airportOptions, error };
};

export default useFetchAirports;