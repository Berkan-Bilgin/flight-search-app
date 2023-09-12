import type { NextApiRequest, NextApiResponse } from "next";
import { airportOptions } from "@/common/airports";

type Flight = {
  id: number;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  price: number;
};

const generateFlights = (numFlights: number): Flight[] => {
  const flights: Flight[] = [];

  let idCounter = 1; // Counter for unique flight IDs

  for (let i = 1; i <= numFlights; i++) {
    const departureAirportOption = airportOptions[Math.floor(Math.random() * airportOptions.length)];
    let arrivalAirportOption = airportOptions[Math.floor(Math.random() * airportOptions.length)];

    // Ensure the arrival airport is different from the departure airport
    while (arrivalAirportOption.value === departureAirportOption.value) {
      arrivalAirportOption = airportOptions[Math.floor(Math.random() * airportOptions.length)];
    }

    const month = Math.floor(Math.random() * 4) + 9; // Random month between September (9) and December (12)
    const departureDate = `2023-${String(month).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    const price = Math.floor(Math.random() * 500) + 100; // Random price between 100 and 600

    // Create departure flight
    flights.push({
      id: idCounter++,
      departureAirport: departureAirportOption.label,
      arrivalAirport: arrivalAirportOption.label,
      departureDate,
      price,
    });

    // Create return flight
    flights.push({
      id: idCounter++,
      departureAirport: arrivalAirportOption.label,
      arrivalAirport: departureAirportOption.label,
      departureDate,
      price,
    });
  }

  return flights;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const flights = generateFlights(500); // Generate 500 departure and 500 return flights, totaling 1000 flights
  res.status(200).json(flights);
}