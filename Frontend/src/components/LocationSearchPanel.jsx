import React from "react";

const LocationSearchPanel = (props) => {
  console.log(props)
  //sample array for addresses
  const addresses = [
    "24B, Near Kapoor's Cafe, Banglore",
    "123, Park Street, New York",
    "56A, Baker Street, London",
  ];

  // map over the addresses array and return a list of location search panel
  return (
    <div>
      {addresses.map(function (e, idx) {
        return (
          <div key={idx}
            onClick={() => {
              props.setvehiclePanel(true)
              props.setpanel(false)
            }}
            className="flex gap-4 border-2 rounded-lg active:border-black items-center justify-start p-4 my-2"
          >
            <h2 className="bg-[#eee] p-2 rounded-full">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4>{e}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
