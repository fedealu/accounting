import * as React from "react";
import { BalanceDisplay } from "../containers/balanceDisplay";

export function Header(props: { userName: string; balance: any }) {
	return (
		<header className="jumbotron">
			<div className="container">
				<div className="row d-flex align-items-center">
					<div className="col-4">
						<h2>Welcome {props.userName}!</h2>
						<h5>This is your account's current balance.</h5>
					</div>
					<div className="col-8 text-right">
						<BalanceDisplay balance={props.balance} />
					</div>
				</div>
			</div>
		</header>
	);
}
