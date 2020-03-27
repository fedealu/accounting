import * as React from "react";
import { Loader } from "./loader";
import UserContext from "../context/userContext";

export function Login() {
	const userContext = React.useContext(UserContext);

	const [userName, setUserName] = React.useState("");
	const [error, setError] = React.useState("");
	const [loginIn, setLoginIn] = React.useState(false);

	let handleLogIn = (e: any) => {
		setLoginIn(true);
		e.preventDefault();
		fetch("http://localhost:4000/api/v1/")
			.then(data => data.json())
			.then(response => {
				setLoginIn(false);
				if (response.success) {
					userContext.setName(userName);
				}
			})
			.catch(err => {
				setLoginIn(false);
				setError("There's been an error, try again later.");
			});
	};

	return (
		<form className="container d-flex flex-column align-items-center justify-content-center">
			<div className="input-group col-6 mb-3 mt-5">
				<div className="input-group-prepend w-100">
					<span className="input-group-text" id="basic-addon1">
						@
					</span>
					<input
						type="text"
						className="form-control"
						placeholder="Type in your name"
						value={userName}
						onChange={e => setUserName(e.target.value)}
					></input>
				</div>
			</div>
			<button
				type="submit"
				className="btn btn-primary mb-3"
				disabled={loginIn}
				onClick={e => handleLogIn(e)}
			>
				Log in
			</button>
			{loginIn ? <Loader /> : ""}

			{error ? <div className="alert alert-danger"> {error}</div> : ""}
		</form>
	);
}
