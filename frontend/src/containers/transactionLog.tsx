import * as React from "react";
import { render } from "react-dom";
import { Loader } from "../components/loader";
import { Transaction } from "../components/transaction";
import UserContext from "../context/userContext";

interface TransactionLogState {
	transactions: any[];
	isLoadingTransactions: boolean;
}

export class TransactionLog extends React.Component<{}, TransactionLogState> {
	public static contextType = UserContext;

	public readonly state: TransactionLogState = {
		transactions: [],
		isLoadingTransactions: false
	};

	public componentWillUpdate() {
		if (this.context.updateLog) {
			this.context.shouldUpdateLog(false);
			this.executeGetLog();
		}
	}

	public componentDidMount() {
		if (this.context.updateLog) {
			this.context.shouldUpdateLog(false);
			this.executeGetLog();
		}
	}

	private executeGetLog() {
		this.setState({ isLoadingTransactions: true });
		fetch("http://localhost:4000/api/v1/transactions")
			.then(data => data.json())
			.then(response => {
				if (response.success) {
					this.setState({
						transactions: response.data.transactions,
						isLoadingTransactions: false
					});
				}
			})
			.catch(err => {
				this.setState({ transactions: [], isLoadingTransactions: false });
			});
	}

	private getTransactions() {
		if (this.state.transactions) {
			let transactions = this.state.transactions.map(transaction => (
				<Transaction transaction={transaction} key={transaction.id} />
			));

			return (
				<div>
					<div className="accordion" id="transaction-accordion">
						{transactions}
					</div>
				</div>
			);
		} else {
			return <div> There are no current transactions in your account </div>;
		}
	}

	private getLoader() {
		return (
			<div className="container d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);
	}

	render() {
		return (
			<div className="container py-5">
				<div className="d-flex justify-content-between">
					<h1 className="mb-3">Transaction History</h1>
					<button
						onClick={() => this.executeGetLog()}
						className="border-0 bg-white"
					>
						<i className="fa fa-refresh"></i>
					</button>
				</div>
				{this.state.isLoadingTransactions
					? this.getLoader()
					: this.getTransactions()}
			</div>
		);
	}
}
