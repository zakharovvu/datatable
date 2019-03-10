import React from "react";

const Filter = ({ onchange, phones }) => (
  <span className="Search">
    Search: 
      <input  onChange={event => onchange(event.target.value)} type="text" />
  </span>
);

export default Filter;