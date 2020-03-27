import * as React from "react";

export function Transaction(props: { transaction: any }) {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	});

	const dateFormatter = new Intl.DateTimeFormat("es-AR");

	const getStateClass = () => {
		if (props.transaction.state === "confirmed") {
			return "text-success";
		}
		if (props.transaction.state === "pending") {
			return "text-warning";
		}
		return "text-danger";
	};

	return (
		<div className="card">
			<div className="card-header">
				<button
					className="btn w-100"
					type="button"
					data-toggle="collapse"
					data-target={`#collapse-${props.transaction.id}`}
				>
					<div className="d-flex align-items-center justify-content-between text-decoration-none">
						<div
							className={`mb-0 text-${props.transaction.type} text-capitalize`}
						>
							{props.transaction.type}
						</div>
						<div
							className={`mb-0 text-${
								props.transaction.type
							} text-uppercase ${getStateClass()}`}
						>
							{props.transaction.state}
						</div>
						<div
							className={`text-${
								props.transaction.type === "credit" ? "success" : "danger"
							} font-weight-bold`}
						>
							{formatter.format(props.transaction.amount)}
						</div>
					</div>
				</button>
			</div>

			<div id={`collapse-${props.transaction.id}`} className="collapse">
				<div className="card-body">
					<div className="row">
						<div className="col-md-4 d-flex align-items-center">
							Transaction ID:
							<span
								title={`Full transaction ID: ${props.transaction.id}`}
								style={{
									marginLeft: ".5rem",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
									maxWidth: 50,
									display: "inline-block"
								}}
							>
								{props.transaction.id}
							</span>
						</div>
						<div className="col-md-4 text-center">
							Date: {dateFormatter.format(props.transaction.effectiveDate)}
						</div>
						<div className="col-md-4 text-right">
							Status: {props.transaction.state.toUpperCase()}
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							Amount:{" "}
							{formatter.format(
								props.transaction.amount < 0
									? -props.transaction.amount
									: props.transaction.amount
							)}
						</div>
						<div className="col-md-4 text-center">
							Before Transaction Amount:{" "}
							{formatter.format(props.transaction.initialBalance)}
						</div>
						<div className="col-md-4 text-right">
							After Transaction Amount:{" "}
							{formatter.format(props.transaction.finalBalance)}
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							Message:{" "}
							{props.transaction.message ? props.transaction.message : ""}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
