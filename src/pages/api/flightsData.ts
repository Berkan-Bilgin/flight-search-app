import type { NextApiRequest, NextApiResponse } from "next";
import { airportOptions } from "@/common/airports";
import { airlines } from "@/common/airlines";

type Flight = {
  id: number;
  departureAirport: string;
  arrivalAirport: string;
  depertureAirportCode: string; // Yeni alan
  arrivalAirportCode: string; // Yeni alan
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  airline: string;
  duration: string;
};

const generateFlights = (numFlights: number): Flight[] => {
  const flights: Flight[] = [];

  let idCounter = 1; // Counter for unique flight IDs

  for (let i = 1; i <= numFlights; i++) {
    const departureAirportOption = airportOptions[Math.floor(Math.random() * airportOptions.length)];
    let arrivalAirportOption = airportOptions[Math.floor(Math.random() * airportOptions.length)];

    while (arrivalAirportOption.value === departureAirportOption.value) {
      arrivalAirportOption = airportOptions[Math.floor(Math.random() * airportOptions.length)];
    }

    const month = Math.floor(Math.random() * 4) + 9;
    const departureDate = `2023-${String(month).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    const departureTime = `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
    const arrivalTime = `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
    const price = Math.floor(Math.random() * 500) + 100;
    const airline = airlines[Math.floor(Math.random() * airlines.length)];

    const durationInMinutes = Math.abs(new Date(`${departureDate}T${arrivalTime}`).getTime() - new Date(`${departureDate}T${departureTime}`).getTime()) / (1000 * 60); // in minutes

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const duration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; // format as 00:00

    flights.push({
      id: idCounter++,
      departureAirport: departureAirportOption.label,
      arrivalAirport: arrivalAirportOption.label,
      departureAirportCode: departureAirportOption.airportCode,  // Yeni alan
      arrivalAirportCode: arrivalAirportOption.airportCode,  // Yeni alan
      departureDate,
      departureTime,
      arrivalTime,
      price,
      airline,
      duration,
    });
  }

  return flights;
};

let flights:any;


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!flights) {
    flights = generateFlights(500);
  }

  const { departureAirport, arrivalAirport } = req.query;

  // Filtreleme parametreleri varsa, uçuşları filtrele
  let filteredFlights = flights;
  
  if (departureAirport) {
    filteredFlights = filteredFlights.filter((flight: Flight) => {
      return flight.departureAirport.startsWith(departureAirport);
    });
  }
  if (arrivalAirport) {
    filteredFlights = filteredFlights.filter((flight: Flight) => {
      return flight.arrivalAirport.startsWith(arrivalAirport);
    });
  }

  res.status(200).json(filteredFlights);
}