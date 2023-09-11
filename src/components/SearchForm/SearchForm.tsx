import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SearchSchema = Yup.object().shape({
  departureAirport: Yup.string().required('Required'),
  arrivalAirport: Yup.string().required('Required'),
  departureDate: Yup.date().required('Required'),
  returnDate: Yup.date().nullable().when('oneWay', (oneWay, schema) => {
    return oneWay ? schema : schema.required('Required');
  }),
  oneWay: Yup.boolean(),
});

const SearchForm = () => {
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
        {({ values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-600">Departure Airport</label>
              <Field name="departureAirport" type="text" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="departureAirport" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="arrivalAirport" className="block text-sm font-medium text-gray-600">Arrival Airport</label>
              <Field name="arrivalAirport" type="text" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="arrivalAirport" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-600">Departure Date</label>
              <Field name="departureDate" type="date" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="departureDate" component="div" className="text-red-500 text-sm" />
            </div>
            {!values.oneWay && (
              <div className="mb-4">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-600">Return Date</label>
                <Field name="returnDate" type="date" className="mt-1 p-2 w-full border rounded-md" />
                <ErrorMessage name="returnDate" component="div" className="text-red-500 text-sm" />
              </div>
            )}
            <div className="mb-4 flex items-center">
              <Field type="checkbox" name="oneWay" className="mr-2" />
              <label htmlFor="oneWay" className="text-sm font-medium text-gray-600">One Way</label>
            </div>
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
