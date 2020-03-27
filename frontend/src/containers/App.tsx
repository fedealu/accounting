import * as React from "react";
import AppStyles from "@styles/App.scss";
import UserContext, { UserProvider } from "../context/userContext";
import { ValidateLogin } from "@components/validateLogIn";

export class App extends React.Component {
	public static contextType = UserContext;

	public render() {
		return (
			<div className={AppStyles["app-container"]}>
				<UserProvider>
					<ValidateLogin />
				</UserProvider>
			</div>
		);
	}
}
