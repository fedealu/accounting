import { Response, Request } from "express";
import { Errors } from "../errors/errors";
import { CommonErrorHandler } from "../../../types/errorHandler";

export class ResponseHandler {
	public handleResponse() {
		return (req: Request, res: Response) => {
			if (global.blockingTransactionInProgress) {
				this.unblockTransactions();
			}

			res
				.status(res.locals.status || Errors.status.success)
				.send(res.locals.response);
		};
	}

	public handleErrorResponse() {
		return (err: CommonErrorHandler, req: Request, res: Response) => {
			console.log("From Error Handler", err);
			res.status(err.status || Errors.status.serverError).send(err.message);
		};
	}

	private unblockTransactions() {
		global.blockingTransactionInProgress = null;
	}
}
