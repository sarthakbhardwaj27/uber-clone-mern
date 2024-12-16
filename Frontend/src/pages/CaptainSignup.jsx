import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {

const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setvehicleColor] = useState("");
  const [vehiclePlate, setvehiclePlate] = useState("");
  const [vehicleCapacity, setvehicleCapacity] = useState("");
  const [vehicleType, setvehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

	const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

	if(response.status === 201){
		const data = response.data;

        setCaptain(data.captain)
        localStorage.setItem('token',data.token);

        navigate('/captain-home')
	}

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setvehicleColor("");
    setvehicleCapacity("");
    setvehiclePlate("");
    setvehicleType("");
  };


  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-xl mb-2">What's your name?</h3>
          <input
            className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First Name"
          />
          <input
            className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
          />

          <h3 className="text-xl mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <h3 className="text-xl mb-2">Vehicle Details</h3>

          <label className="block text-base mb-2">Vehicle Color</label>
          <input
            className="bg-[#eeeeee] mb-4 border rounded px-4 py-2 w-full text-lg"
            required
            value={vehicleColor}
            onChange={(e) => setvehicleColor(e.target.value)}
            type="text"
            placeholder="Vehicle Color (e.g., Red)"
          />

          <label className="block text-base mb-2">Vehicle Plate</label>
          <input
            className="bg-[#eeeeee] mb-4 border rounded px-4 py-2 w-full text-lg"
            required
            value={vehiclePlate}
            onChange={(e) => setvehiclePlate(e.target.value)}
            type="text"
            placeholder="Vehicle Plate (e.g., ABC-1234)"
          />

          <label className="block text-base mb-2">Vehicle Capacity</label>
          <input
            className="bg-[#eeeeee] mb-4 border rounded px-4 py-2 w-full text-lg"
            required
            value={vehicleCapacity}
            onChange={(e) => setvehicleCapacity(e.target.value)}
            type="number"
            placeholder="Vehicle Capacity (e.g., 4)"
          />

          <label className="block text-base mb-2">Vehicle Type</label>
          <div className="relative mb-7">
            <select
              className="bg-[#eeeeee] border rounded px-4 py-2 w-full text-lg appearance-none"
              required
              value={vehicleType}
              onChange={(e) => setvehicleType(e.target.value)}
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button className="bg-black text-white mb-3 rounded px-4 py-2 w-full text-lg">
            Create Account
          </button>
        </form>
        <p className="text-center ">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/signup"
          className="bg-[#10b461] flex justify-center items-center text-white mb-7 rounded px-4 py-2 w-full text-lg"
        >
          Sign up as a user
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
