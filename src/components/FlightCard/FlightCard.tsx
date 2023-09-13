 const FlightCard = ({ flight, index, openRowIndex, setOpenRowIndex }) => {
    return (
      <div className="bg-white p-4 rounded-md shadow-md mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{flight.departureAirport.substring(5)} ---&gt; {flight.arrivalAirport.substring(5)}</h2>
            <p>Departure: {flight.departureTime}</p>
            <p>Arrival: {flight.arrivalTime}</p>
            <p>Duration: {flight.duration}</p>
            <p>Price: {flight.price}</p>
          </div>
          <button onClick={() => setOpenRowIndex(openRowIndex === index ? null : index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Details
          </button>
        </div>
        {openRowIndex === index && (
          <div className="mt-2" >
           <h1> Airline: {flight.airline}</h1>
            <h1>Flight Duration: {flight.duration}</h1>
          </div>
        )}
      </div>
    );
  };

  export default FlightCard;