import { ETransactionType, Transaction } from "../models/transactionModel";
import { TransactionHistoryLog } from "../../db/transaction.db";
import BalanceService from "./balanceService";
import { Errors } from "../errors/errors";
import { Request, Response, NextFunction } from "express";

class TransactionService {
	public initialTransaction(transaction: Transaction) {
		BalanceService.processTransaction(transaction);
		transaction.confirm();
		TransactionHistoryLog.push(transaction);
	}

	public attemptTransaction(type: ETransactionType, amount: number) {
		return new Promise((resolve, reject) => {
			const transaction = new Transaction(amount, type);
			TransactionHistoryLog.push(transaction);

			if (!this._validateTransactionTypeAndAmount(transaction, reject)) {
				return;
			}

			if (
				global.blockingTransactionInProgress &&
				global.blockingTransactionInProgress !== transaction.id
			) {
				transaction.fail("TRANSACTION_IN_PROGRESS");
				reject({
					status: Errors.status.transactionInProgress,
					message: Errors.message.TRANSACTION_IN_PROGRESS
				});
				return;
			} else {
				global.blockingTransactionInProgress = transaction.id;
			}
			setTimeout(() => {
				try {
					BalanceService.processTransaction(transaction);
					transaction.confirm();
					resolve(transaction);
				} catch (err) {
					transaction.fail(err);
					reject({ message: err });
				}
			}, global.defaultTransactionTime);
		});
	}

	public areTransactionsEnabledAsMiddleware() {
		return (req: Request, res: Response, next: NextFunction) => {
			global.blockingTransactionInProgress
				? next({ status: Errors.status.TRANSACTION_IN_PROGRESS })
				: next();
		};
	}

	private _validateTransactionTypeAndAmount(
		transaction: Transaction,
		reject: Function
	) {
		if (
			(transaction.type !== "credit" && transaction.type !== "debit") ||
			transaction.amount < 0
		) {
			transaction.fail("WRONG_PARAMETERS");
			reject({
				status: Errors.status.wrongParameters,
				message: Errors.message.WRONG_PARAMETERS
			});
			return false;
		}
		return true;
	}
}

export default new TransactionService();
