const flights = [
    { id: 1, departure: 'JFK', arrival: 'LAX', price: 200 },
    { id: 2, departure: 'JFK', arrival: 'SFO', price: 250 },
    { id: 3, departure: 'LAX', arrival: 'ORD', price: 150 },
    { id: 4, departure: 'JFK', arrival: 'LAX', price: 200 },
    { id: 5, departure: 'JFK', arrival: 'SFO', price: 250 },
    { id: 6, departure: 'LAX', arrival: 'ORD', price: 350 },
    { id: 7, departure: 'JFK', arrival: 'LAX', price: 400 },
    { id: 8, departure: 'JFK', arrival: 'SFO', price: 550 },
    { id: 9, departure: 'LAX', arrival: 'ORD', price: 650 },
    
  ];


  export default function handler(req, res) {
    const { departure, arrival } = req.query;
  
    const filteredFlights = flights.filter(flight => {
      return (!departure || flight.departure === departure) && (!arrival || flight.arrival === arrival);
    });
  
    res.status(200).json(filteredFlights);
  }