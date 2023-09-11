import type { NextApiRequest, NextApiResponse } from "next";

type Flight = {
  id: number;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  price: number;
};

const generateFlights = (numFlights: number): Flight[] => {
  const airports = ["JFK", "LAX", "ORD", "SFO", "ATL", "MIA", "DFW", "SEA", "BOS", "MCO", "LAS"];
  const flights: Flight[] = [];

  let idCounter = 1; // Counter for unique flight IDs

  for (let i = 1; i <= numFlights; i++) {
    const departureAirport = airports[Math.floor(Math.random() * airports.length)];
    let arrivalAirport = airports[Math.floor(Math.random() * airports.length)];

    // Ensure the arrival airport is different from the departure airport
    while (arrivalAirport === departureAirport) {
      arrivalAirport = airports[Math.floor(Math.random() * airports.length)];
    }

    const month = Math.floor(Math.random() * 4) + 9; // Random month between September (9) and December (12)
    const departureDate = `2023-${String(month).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    const price = Math.floor(Math.random() * 500) + 100; // Random price between 100 and 600

    // Create departure flight
    flights.push({
      id: idCounter++,
      departureAirport,
      arrivalAirport,
      departureDate,
      price,
    });

    // Create return flight
    flights.push({
      id: idCounter++,
      departureAirport: arrivalAirport,
      arrivalAirport: departureAirport,
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