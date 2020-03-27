import { ETransactionType, Transaction } from "../models/transactionModel";
import { Errors } from "../errors/errors";

class BalanceService {
	private currentBalance: number;

	constructor() {
		this.currentBalance = 0;
	}

	public getCurrentBalance() {
		return this.currentBalance;
	}

	public processTransaction(transaction: Transaction) {
		if (this.dryProcessTransaction(transaction) >= 0) {
			this.commitTransaction(transaction);
		} else {
			throw "INSUFFICIENT_FUNDS";
		}
	}

	private commitTransaction(transaction: Transaction) {
		this.currentBalance += transaction.amount;
	}

	private dryProcessTransaction(transaction: Transaction) {
		try {
			return this.currentBalance + transaction.amount;
		} catch (err) {
			return -1;
		}
	}
}

export default new BalanceService();
