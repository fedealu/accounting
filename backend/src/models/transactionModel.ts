import { TransactionHistoryLog } from "../../db/transaction.db";
import { Errors } from "../errors/errors";
import BalanceService from "../services/balanceService";

const hash = require("object-hash");

export enum ETransactionType {
	debit = "debit",
	credit = "credit"
}

export enum ETransactionState {
	pending = "pending",
	confirmed = "confirmed",
	failed = "failed"
}

export class Transaction {
	public id: string;
	public type: ETransactionType;
	public amount: number;
	private effectiveDate: Number; // Transaction date in milliseconds
	private state: ETransactionState;
	private initialBalance: number;
	private finalBalance: number = 0;
	private message?: string;

	constructor(amount: number, type: ETransactionType, message?: string) {
		this.type = type;
		this.amount = this.type === ETransactionType.credit ? amount : -amount;
		this.effectiveDate = new Date().getTime();
		this.id = hash(`${this.amount}${this.type}${this.effectiveDate}`);
		this.state = ETransactionState.pending;
		if (message) {
			this.message = message;
		}
		this.initialBalance = BalanceService.getCurrentBalance();
	}

	public confirm() {
		this.state = ETransactionState.confirmed;
		this.finalBalance = BalanceService.getCurrentBalance();
	}

	public fail(messageId: string) {
		this.state = ETransactionState.failed;
		this.message = Errors.message[messageId];
		this.finalBalance = BalanceService.getCurrentBalance();
	}
}
