import * as React from "react";
import balanceDisplayStyles from "@styles/balanceDisplayStyles.scss";
import UserContext from "../context/userContext";
import { Loader } from "../components/loader";

export class BalanceDisplay extends React.Component<{ balance: number }> {
	public static contextType = UserContext;
	public readonly state = { isLoadingBalance: true };

	constructor(props: { balance: number }) {
		super(props);
	}

	private formatter = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "USD"
	});

	public componentDidMount() {
		this.fetchBalance();
	}

	private fetchBalance() {
		this.setState({ isLoadingBalance: true });
		fetch("http://localhost:4000/api/v1/")
			.then(data => data.json())
			.then(response => {
				this.setState({ isLoadingBalance: false });
				if (response.success) {
					this.context.setBalance(response.data.currentBalance);
				}
			})
			.catch(err => {
				this.setState({ isLoadingBalance: false });
			});
	}

	public render() {
		return (
			<div className={balanceDisplayStyles["balance-display"]}>
				<p>Current Balance</p>
				<div className={balanceDisplayStyles["balance-display__balance"]}>
					{this.state.isLoadingBalance ? (
						<Loader />
					) : (
						this.formatter.format(this.context.balance)
					)}
				</div>
				<button onClick={() => this.fetchBalance()}>
					<p className="mr-2 mb-0 d-inline-block">Refresh balance</p>
					<i className="fa fa-refresh"></i>
				</button>
			</div>
		);
	}
}
