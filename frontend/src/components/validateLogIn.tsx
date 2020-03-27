import * as React from "react";
import UserContext from "../context/userContext";
import { LoggedInUser } from "./loggedInUser";
import { Login } from "./login";

export function ValidateLogin() {
	const userContext = React.useContext(UserContext);

	return userContext.name ? <LoggedInUser /> : <Login />;
}
