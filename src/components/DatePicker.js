import { useState } from "react";
import PropTypes from "prop-types";

export function DatePicker(props) {
  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState("");
  const [minDate] = useState(today);
  const handleDateChange = (event) => {
    setDate(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <>
      <input
        className="w-40 bg-white focus:outline-none focus:shadow-outline-blue border border-gray-300 rounded-lg py-2 px-4 block  appearance-none leading-normal float-right"
        type="date"
        id="start"
        name="trip-start"
        min={minDate}
        onChange={(event) => {
          handleDateChange(event);
        }}
      ></input>
    </>
  );
}
DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  date: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
};
