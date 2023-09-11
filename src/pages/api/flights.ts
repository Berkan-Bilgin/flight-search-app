import type { NextApiRequest, NextApiResponse } from "next";

type Flight = {
  id: number;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate: string;
  price: number;
};

const flights: Flight[] = [
  {
    id: 1,
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureDate: "2023-10-01",
    returnDate: "2023-10-05",
    price: 300,
  },
  {
    id: 2,
    departureAirport: "ORD",
    arrivalAirport: "SFO",
    departureDate: "2023-11-15",
    returnDate: "2023-11-20",
    price: 250,
  },
  {
    id: 3,
    departureAirport: "ATL",
    arrivalAirport: "MIA",
    departureDate: "2023-12-01",
    returnDate: "2023-12-07",
    price: 200,
  },
  {
    id: 4,
    departureAirport: "DFW",
    arrivalAirport: "JFK",
    departureDate: "2023-09-10",
    returnDate: "2023-09-15",
    price: 280,
  },
  {
    id: 5,
    departureAirport: "LAX",
    arrivalAirport: "ORD",
    departureDate: "2023-08-20",
    returnDate: "2023-08-25",
    price: 270,
  },
  {
    id: 6,
    departureAirport: "SEA",
    arrivalAirport: "MCO",
    departureDate: "2023-07-01",
    returnDate: "2023-07-05",
    price: 350,
  },
  {
    id: 7,
    departureAirport: "BOS",
    arrivalAirport: "LAS",
    departureDate: "2023-06-15",
    returnDate: "2023-06-20",
    price: 400,
  },
  {
    id: 8,
    departureAirport: "MCO",
    arrivalAirport: "SEA",
    departureDate: "2023-05-10",
    returnDate: "2023-05-15",
    price: 330,
  },
  {
    id: 9,
    departureAirport: "LAS",
    arrivalAirport: "BOS",
    departureDate: "2023-04-20",
    returnDate: "2023-04-25",
    price: 420,
  },
  {
    id: 10,
    departureAirport: "MIA",
    arrivalAirport: "ATL",
    departureDate: "2023-03-15",
    returnDate: "2023-03-20",
    price: 210,
  },
  {
    id: 11,
    departureAirport: "LAX",
    arrivalAirport: "JFK",
    departureDate: "2023-08-01",
    returnDate: "2023-08-05",
    price: 360,
  },
  {
    id: 12,
    departureAirport: "ORD",
    arrivalAirport: "SFO",
    departureDate: "2023-09-15",
    returnDate: "2023-09-20",
    price: 410,
  },
  {
    id: 13,
    departureAirport: "ATL",
    arrivalAirport: "MIA",
    departureDate: "2023-10-10",
    returnDate: "2023-10-15",
    price: 340,
  },
  {
    id: 14,
    departureAirport: "DFW",
    arrivalAirport: "JFK",
    departureDate: "2023-11-20",
    returnDate: "2023-11-25",
    price: 430,
  },
  {
    id: 15,
    departureAirport: "SEA",
    arrivalAirport: "MCO",
    departureDate: "2023-12-15",
    returnDate: "2023-12-20",
    price: 220,
  },
  {
    id: 16,
    departureAirport: "BOS",
    arrivalAirport: "LAX",
    departureDate: "2023-07-10",
    returnDate: "2023-07-15",
    price: 370,
  },
  {
    id: 17,
    departureAirport: "SFO",
    arrivalAirport: "ORD",
    departureDate: "2023-08-05",
    returnDate: "2023-08-10",
    price: 390,
  },
  {
    id: 18,
    departureAirport: "MIA",
    arrivalAirport: "ATL",
    departureDate: "2023-09-12",
    returnDate: "2023-09-17",
    price: 310,
  },
  {
    id: 19,
    departureAirport: "JFK",
    arrivalAirport: "DFW",
    departureDate: "2023-10-22",
    returnDate: "2023-10-27",
    price: 440,
  },
  {
    id: 20,
    departureAirport: "MCO",
    arrivalAirport: "SEA",
    departureDate: "2023-11-18",
    returnDate: "2023-11-23",
    price: 230,
  },
  {
    id: 21,
    departureAirport: "LAS",
    arrivalAirport: "BOS",
    departureDate: "2023-12-05",
    returnDate: "2023-12-10",
    price: 460,
  },
  {
    id: 22,
    departureAirport: "ATL",
    arrivalAirport: "MIA",
    departureDate: "2024-01-15",
    returnDate: "2024-01-20",
    price: 320,
  },
  {
    id: 23,
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureDate: "2024-02-10",
    returnDate: "2024-02-15",
    price: 380,
  },
  {
    id: 24,
    departureAirport: "ORD",
    arrivalAirport: "SFO",
    departureDate: "2024-03-12",
    returnDate: "2024-03-17",
    price: 400,
  },
  {
    id: 25,
    departureAirport: "LAX",
    arrivalAirport: "BOS",
    departureDate: "2024-04-20",
    returnDate: "2024-04-25",
    price: 470,
  },
  {
    id: 26,
    departureAirport: "JFK",
    arrivalAirport: "LAX",
    departureDate: "2024-05-01",
    returnDate: "2024-05-05",
    price: 300,
  },
  {
    id: 27,
    departureAirport: "ORD",
    arrivalAirport: "SFO",
    departureDate: "2024-06-15",
    returnDate: "2024-06-20",
    price: 250,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // GET isteği için işlemler
    res.status(200).json(flights);
  } else if (req.method === 'POST') {
    // POST isteği için işlemler
    const newFlight: Flight = req.body;
    
    if (!newFlight.id || !newFlight.departureAirport || !newFlight.arrivalAirport || !newFlight.departureDate || !newFlight.returnDate || !newFlight.price) {
      return res.status(400).json({ message: 'Eksik bilgi' });
    }

    flights.push(newFlight);
    res.status(201).json(newFlight);
  } else {
    // Diğer HTTP metodları için 405 Method Not Allowed hatası döndür
    res.status(405).end();
  }
}