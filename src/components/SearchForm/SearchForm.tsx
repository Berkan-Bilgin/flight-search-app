import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../CustomSelect/CustomSelect';
import { useFlightOptions } from '@/hooks/useFlightOptions';
import TripModeSwitch from '../TripModeSwitch/TripModeSwitch';
import useFetchAirports from '@/hooks/useFetchAirports';

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
  const { setDepartureAirport, arrivalOptions } = useFlightOptions();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md ">
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
            <div className="mb-4 flex justify-between ">
              {/* From */}
              <div className="w-1/2">
                <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-600">
                  From
                </label>
                <Field
                  name="departureAirport"
                  component={CustomSelect}
                  options={airportOptions}
                  onChange={(option) => {
                    setFieldValue('departureAirport', option ? option.value : '');
                    setDepartureAirport(option ? option.value : null);
                  }}
                />
                <ErrorMessage name="departureAirport" component="div" className="text-red-500 text-sm" />
              </div>
              {/* To */}
              <div className="w-1/2">
                <label htmlFor="arrivalAirport" className="block text-sm font-medium text-gray-600">
                  To
                </label>
                <Field
                  name="arrivalAirport"
                  component={CustomSelect}
                  options={arrivalOptions} // arrivalOptions'u kullanın
                />
                <ErrorMessage name="arrivalAirport" component="div" className="text-red-500 text-sm" />
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
