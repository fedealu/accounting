import * as React from "react";
import { Header } from "./header";
import { TransactionLog } from "../containers/transactionLog";
import { TransactionPlacer } from "./transactionPlacer";
import UserContext from "../context/userContext";

export function LoggedInUser(props: {}) {
	let userContext = UserContext;
	return (
		<UserContext.Consumer>
			{({ name, balance }) => (
				<div>
					<Header userName={name} balance={balance} />
					<TransactionPlacer />
					<TransactionLog />
				</div>
			)}
		</UserContext.Consumer>
	);
}
