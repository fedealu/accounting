import * as React from "react";
import { Loader } from "./loader";

export function PlacerAction(props: {
	actionName: string;
	actionHandler: Function;
}) {
	const [value, setValue] = React.useState(0);
	const [isActionRunning, setIsActionRunning] = React.useState(false);
	const [messageClass, setMessageClass] = React.useState("");
	const [message, setMessage] = React.useState("");

	const clickHandler = (e: any) => {
		e.preventDefault();
		setIsActionRunning(true);
		setMessage("");
		props.actionHandler(value).then((result: any) => {
			setMessageClass(result.error ? "text-danger" : "text-success");
			setMessage(result.message);
			setIsActionRunning(false);
		});
	};

	const shouldDisableAction = () => {
		return value <= 0 || isActionRunning;
	};

	return (
		<form className="form-group m-0 card">
			<div className="card-header">{props.actionName}</div>
			<div className="card-body">
				<div className="form-group row flex-nowrap p-0 m-0">
					<label className="col-form-label text-nowrap mr-2">$</label>
					<input
						type="number"
						className="form-control-plaintext text-right flex-grow-1 border border-secondary rounded mb-3"
						value={value}
						onChange={e => setValue(Number(e.target.value))}
					/>
				</div>
				<div className="d-flex align-items-center justify-content-end">
					{isActionRunning ? <Loader /> : ""}
					{message ? (
						<div onClick={() => setMessage("")} className={messageClass}>
							{message}
						</div>
					) : (
						""
					)}
					<button
						className="btn btn-primary d-block ml-3"
						onClick={e => clickHandler(e)}
						disabled={shouldDisableAction()}
					>
						{`Confirm ${props.actionName}`}
					</button>
				</div>
			</div>
		</form>
	);
}
