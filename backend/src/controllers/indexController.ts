import { Response, Request } from "express";
import { BaseController, HTTPMethodsAvailable } from "../base/baseController";
import BalanceService from "../services/balanceService";
import { Errors } from "../errors/errors";

export class IndexController extends BaseController {
	constructor() {
		super("");
		this.registerMethods({
			type: HTTPMethodsAvailable.get,
			cb: [this.getBalance()]
		});
	}

	private getBalance() {
		return (req: Request, res: Response) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					res.locals.status = Errors.status.success;
					res.locals.response = {
						success: true,
						data: { currentBalance: BalanceService.getCurrentBalance() }
					};
					resolve();
				}, global.defaultTransactionTime);
			});
		};
	}
}
