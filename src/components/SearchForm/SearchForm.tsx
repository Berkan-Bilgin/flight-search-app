import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../CustomSelect/CustomSelect';
import TripModeSwitch from '../TripModeSwitch/TripModeSwitch';
import useFetchAirports from '@/hooks/useFetchAirports';
import { useEffect, useState } from 'react';
import { useFetchFlightsData } from '@/hooks/useFetchFlightsData';

const SearchSchema = Yup.object().shape({
  departureAirport: Yup.string().required('Required'),
  arrivalAirport: Yup.string().required('Required'),
  departureDate: Yup.date().required('Required'),
  oneWay: Yup.boolean(),
  returnDate: Yup.date().when('oneWay', {
    is: (oneWay: boolean) => oneWay === false,
    then: () => Yup.date().required('Required'),
    otherwise: () => Yup.date().nullable(),
  }),
});

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
      console.log(values);
    }
  };

  const { airportOptions, error } = useFetchAirports();

  const { flights } = useFetchFlightsData();

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [arrivalOptions, setArrivalOptions] = useState([]);

  useEffect(() => {
    if (selectedDeparture) {
      const filteredFlights = flights.filter((flight) => flight.departureAirportCode === selectedDeparture);

      const uniqueArrivalAirports = Array.from(new Set(filteredFlights.map((flight) => flight.arrivalAirportCode)));

      const newArrivalOptions = uniqueArrivalAirports.map((code) => {
        const flight = filteredFlights.find((flight) => flight.arrivalAirportCode === code);
        return {
          value: flight.arrivalAirportCode,
          label: flight.arrivalAirport,
        };
      });

      setArrivalOptions(newArrivalOptions);
      console.log(
        'selected-->',
        selectedDeparture,
        'arrival-->',
        filteredFlights,
        'airportOptions-->',
        airportOptions,
        'arrivalOptions-->',
        arrivalOptions,
      );
    }
  }, [selectedDeparture, flights]);

  return (
    <div className="max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 ">Search Flights</h2>
      <Formik
        initialValues={{
          departureAirport: '',
          arrivalAirport: '',
          departureDate: '',
          returnDate: '',
          oneWay: true,
        }}
        validationSchema={SearchSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* TripModeSwitch */}
            <div className="mb-4">
              <TripModeSwitch setFieldValue={setFieldValue} />
            </div>
            <div className="flex justify-between items-center">
              {/* From */}
              <div style={{ width: '45%' }}>
                <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-600">
                  From
                </label>
                <Field
                  name="departureAirport"
                  component={CustomSelect}
                  options={airportOptions}
                  placeholder="From"
                  onChange={(option) => {
                    setFieldValue('departureAirport', option ? option.value : '');
                    setFieldValue('arrivalAirport', '');
                    setSelectedDeparture(option ? option.value : null);
                  }}
                />
                <div className="h-5">
                  {' '}
                  {/* Bu div sabit bir yükseklikte tutuldu. */}
                  <ErrorMessage name="departureAirport" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Exchange Button */}
              <div style={{ width: '8%' }} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const tempDepartureValue = values.departureAirport; // Örneğin: 'JFK'
                    const tempArrivalValue = values.arrivalAirport;     // Örneğin: 'LAX'
                    
                    const tempDepartureLabel = airportOptions.find(opt => opt.value === tempDepartureValue)?.label;
                    const tempArrivalLabel = airportOptions.find(opt => opt.value === tempArrivalValue)?.label;
                  }}
                >
                  <img className="" src="images/exchange.png" alt="" />
                </button>
              </div>

              <button className='bg-red-600'>
                deneme tahtası
              </button>

              {/* To */}
              <div style={{ width: '45%' }}>
                <label htmlFor="arrivalAirport" className="block text-sm font-medium text-gray-600">
                  To
                </label>
                <Field name="arrivalAirport" component={CustomSelect} placeholder="To" options={arrivalOptions} />
                <div className="h-5">
                  {' '}
                  {/* Bu div de sabit bir yükseklikte tutuldu. */}
                  <ErrorMessage name="arrivalAirport" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
            </div>

            {/* Departure Date */}
            <div className="mb-4">
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-600">
                Departure Date
              </label>
              <Field name="departureDate" type="date" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="departureDate" component="div" className="text-red-500 text-sm" />
            </div>
            {/* One Way */}
            <div className="mb-4 flex items-center">
              <Field type="checkbox" name="oneWay" className="mr-2" />
              <label htmlFor="oneWay" className="text-sm font-medium text-gray-600">
                One Way
              </label>
            </div>
            {/* Return Date */}
            {!values.oneWay && (
              <div className="mb-4">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-600">
                  Return Date
                </label>
                <Field name="returnDate" type="date" className="mt-1 p-2 w-full border rounded-md" />
                <ErrorMessage name="returnDate" component="div" className="text-red-500 text-sm" />
              </div>
            )}
            <div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
