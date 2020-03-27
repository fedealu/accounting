import { Response, Request, NextFunction } from "express";
import { BaseController, HTTPMethodsAvailable } from "../base/baseController";
import { TransactionHistoryLog } from "../../db/transaction.db";
import { validateRequiredParams } from "../utils/utils";
import TransactionService from "../services/transactionService";
import { Errors } from "../errors/errors";
import BalanceService from "../services/balanceService";

export class TransactionController extends BaseController {
	constructor() {
		super("transactions");
		this.registerMethods([
			{ type: HTTPMethodsAvailable.get, cb: [this.list()] },
			{ type: HTTPMethodsAvailable.get, cb: [this.listId()], params: ["id"] },
			{
				type: HTTPMethodsAvailable.post,
				cb: [validateRequiredParams(["amount", "type"]), this.create()]
			}
		]);
	}

	private list() {
		return (req: Request, res: Response) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					res.locals.status = Errors.status.success;
					res.locals.response = {
						success: true,
						data: {
							transactions: TransactionHistoryLog
						}
					};
					resolve();
				}, global.defaultTransactionTime);
			});
		};
	}

	private listId() {
		return (req: Request, res: Response) => {
			res.locals.status = Errors.status.success;
			res.locals.response = {
				success: true,
				data: {
					transaction: TransactionHistoryLog.filter(
						t => t.id === req.params.id
					).reduce((acc, curr) => (acc = { ...curr }), {})
				}
			};
		};
	}

	private create() {
		return (req: Request, res: Response) => {
			try {
				return TransactionService.attemptTransaction(
					req.body.type,
					req.body.amount
				)
					.then(transaction => {
						res.locals.status = Errors.status.success;
						res.locals.response = {
							success: true,
							data: {
								transaction,
								currentBalance: BalanceService.getCurrentBalance()
							}
						};
					})
					.catch(err => {
						res.locals.status = err.status;
						res.locals.response = {
							success: false,
							data: {
								currentBalance: BalanceService.getCurrentBalance(),
								message: err.message
							}
						};
					});
			} catch (err) {
				res.locals.status = Errors.status.serverError;
				res.locals.response = {
					success: false,
					data: {
						currentBalance: BalanceService.getCurrentBalance(),
						message: err.message
					}
				};
				return Promise.reject();
			}
		};
	}
}
