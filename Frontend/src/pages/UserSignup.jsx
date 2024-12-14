import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserSignup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userData, setUserData] = useState({});

	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		});

		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		console.log(userData);
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
					<button className="bg-black text-white mb-3 rounded px-4 py-2 w-full text-lg">
						Login
					</button>
				</form>
				<p className="text-center ">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-600">
						Login Here
					</Link>
				</p>
			</div>
			<div>
				<Link
					to="/captain-signup"
					className="bg-[#10b461] flex justify-center items-center text-white mb-7 rounded px-4 py-2 w-full text-lg"
				>
					Sign up as a Captain
				</Link>
			</div>
		</div>
	);
};

export default UserSignup;
