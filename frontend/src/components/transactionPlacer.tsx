import * as React from "react";
import { PlacerAction } from "./placerAction";
import UserContext from "../context/userContext";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";

export function TransactionPlacer() {
	const { setBalance, shouldUpdateLog } = React.useContext(UserContext);
	let alert: any = null;

	const handleDebit = (amount: number) => {
		const alertTime = 3000;
		return executeTransaction("debit", amount)
			.then(result => {
				if (result.success) {
					setBalance(result.data.currentBalance);
					alert = (
						<Toast
							show={true}
							delay={alertTime}
							autohide
							className="alert alert-success"
						>
							<ToastHeader>Credit Transaction Successful</ToastHeader>
							<ToastBody>{`You've deposit ${amount} into your account`}</ToastBody>
						</Toast>
					);
					return { error: false, message: "Transaction Succeded" };
				} else {
					alert = (
						<Toast
							show={true}
							delay={alertTime}
							autohide
							className="alert alert-danger"
						>
							<ToastHeader>Oops, an error ocurred</ToastHeader>
							<ToastBody>{result.data.message}</ToastBody>
						</Toast>
					);
					return {
						error: true,
						message: "Transaction Failed"
					};
				}
			})
			.catch(err => {
				shouldUpdateLog(true);
				alert = (
					<Toast
						show={true}
						delay={alertTime}
						autohide
						className="alert alert-danger"
					>
						<ToastHeader>Oops, an error ocurred</ToastHeader>
						<ToastBody>{err.message}</ToastBody>
					</Toast>
				);

				return {
					error: true,
					message: "Transaction Failed"
				};
			});
	};

	const handleCredit = (amount: number) => {
		const alertTime = 3000;
		return executeTransaction("credit", amount)
			.then(result => {
				if (result.success) {
					setBalance(result.data.currentBalance);

					alert = (
						<Toast
							show={true}
							delay={alertTime}
							autohide
							className="alert alert-success"
						>
							<ToastHeader>Debit Transaction Successful</ToastHeader>
							<ToastBody>{`You've withdrawn ${amount} from your account`}</ToastBody>
						</Toast>
					);

					return {
						error: false,
						message: "Transaction Success"
					};
				} else {
					alert = (
						<Toast
							show={true}
							delay={alertTime}
							autohide
							className="alert alert-danger"
						>
							<ToastHeader>Oops, an error ocurred</ToastHeader>
							<ToastBody>{result.data.message}</ToastBody>
						</Toast>
					);

					return {
						error: true,
						message: "Transaction Failed"
					};
				}
			})
			.catch(err => {
				shouldUpdateLog(true);
				alert = (
					<Toast
						show={true}
						delay={alertTime}
						autohide
						className="alert alert-danger"
					>
						<ToastHeader>Oops, an error ocurred</ToastHeader>
						<ToastBody>{err.message}</ToastBody>
					</Toast>
				);

				return {
					error: true,
					message: "Transaction Failed"
				};
			});
	};

	const executeTransaction = (type: string, amount: number) => {
		return fetch(`http://localhost:4000/api/v1/transactions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ type, amount })
		})
			.then(data => data.json())
			.then(data => {
				shouldUpdateLog(true);
				return data;
			});
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-6">
					<PlacerAction actionName="Withdraw" actionHandler={handleDebit} />
				</div>
				<div className="col-6">
					<PlacerAction actionName="Deposit" actionHandler={handleCredit} />
				</div>
			</div>
			{alert}
		</div>
	);
}
