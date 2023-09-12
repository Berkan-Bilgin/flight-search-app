import React, {useState, useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';
import { useFlightOptions } from '@/hooks/useFlightOptions';


const SearchSchema = Yup.object().shape({
  departureAirport: Yup.string().required('Required'),
  arrivalAirport: Yup.string().required('Required'),
  departureDate: Yup.date().required('Required'),
  oneWay: Yup.boolean(),
  returnDate: Yup.date().when('oneWay', {
    is: false, // oneWay false olduğunda
    then: Yup.date().required('Required'), // returnDate required olacak
    otherwise: Yup.date().nullable() // oneWay true olduğunda, returnDate isteğe bağlı olacak
  }),
});

const CustomSelect = ({ options, field, form, onChange }) => {
  return (
    <Select
      id="long-value-select"
      instanceId="long-value-select"
      options={options}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={(option) => {
        if (form && field) {
          form.setFieldValue(field.name, option ? option.value : '');
          if (onChange) {
            onChange(option);
          }
        }
      }}
    />
  );
};

const SearchForm = () => {
  const [airportOptions, setAirportOptions] = useState([]);
  const {  setDepartureAirport, arrivalOptions } = useFlightOptions();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get('/api/airportsOptions');
        setAirportOptions(response.data);
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchAirports();
  }, []);


  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Search Flights</h2>
      <Formik
        initialValues={{
          departureAirport: '',
          arrivalAirport: '',
          departureDate: '',
          returnDate: '',
          oneWay: false,
        }}
        validationSchema={SearchSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* From */}
           <div className="mb-4">
            <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-600">Departure Airport</label>
            <Field
              name="departureAirport"
              component={CustomSelect}
              options={airportOptions}
              onChange={option => {
                setFieldValue('departureAirport', option ? option.value : '');
                setDepartureAirport(option ? option.value : null);
              }}
              />
            <ErrorMessage name="departureAirport" component="div" className="text-red-500 text-sm" />
          </div>
          {/* To */}
          <div className="mb-4">
            <label htmlFor="arrivalAirport" className="block text-sm font-medium text-gray-600">Arrival Airport</label>
            <Field
              name="arrivalAirport"
              component={CustomSelect}
              options={arrivalOptions} // arrivalOptions'u kullanın
            />
            <ErrorMessage name="arrivalAirport" component="div" className="text-red-500 text-sm" />
          </div>
          {/* Departure Date */}
            <div className="mb-4">
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-600">Departure Date</label>
              <Field name="departureDate" type="date" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="departureDate" component="div" className="text-red-500 text-sm" />
            </div>
            {/* One Way */}
            <div className="mb-4 flex items-center">
              <Field type="checkbox" name="oneWay" className="mr-2" />
              <label htmlFor="oneWay" className="text-sm font-medium text-gray-600">One Way</label>
            </div>
            {/* Return Date */}
            {!values.oneWay && (
              <div className="mb-4">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-600">Return Date</label>
                <Field name="returnDate" type="date" className="mt-1 p-2 w-full border rounded-md" />
                <ErrorMessage name="returnDate" component="div" className="text-red-500 text-sm" />
              </div>
            )}
            <div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">Search</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
