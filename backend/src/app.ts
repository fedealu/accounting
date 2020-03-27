import express from "express";
import { Application } from "express";
import { Server } from "../../types/serverConfig";
import { RegisteredControllers } from "./registeredController";
import { ResponseHandler } from "./handlers/responseHandler";
import { Transaction, ETransactionType } from "./models/transactionModel";
import TransactionService from "./services/transactionService";
const cors = require("cors");
const bodyParser = require("body-parser");

class App {
	public app: Application;
	public port: number;
	private apiPrefix: string;
	private controllers: RegisteredControllers[] = [];
	private responseHandler: ResponseHandler;

	constructor(appConfig: Server.IServerConfig) {
		this.app = express();
		this.port = appConfig.port;
		this.apiPrefix = appConfig.apiPrefix;
		this.responseHandler = new ResponseHandler();

		this.initApp(appConfig);
	}

	private initApp(config: Server.IServerConfig) {
		this.app.use(cors());
		this.app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
		this.app.use(bodyParser.json()); // parse application/json
		this.loadMiddlewares(config.middlewares);
		this.loadControllers(config.controllers);
		this.initUserBalance();
		this.setResponseHandlers();
	}

	private initUserBalance() {
		TransactionService.initialTransaction(
			new Transaction(
				Number(global.initialBalance),
				ETransactionType.credit,
				"INITIAL TRANSACTION - Modify this in .env file"
			)
		);
	}

	private loadMiddlewares(middlewares: any[]) {
		middlewares.forEach(middleware => {
			this.app.use(middleware);
		});
	}

	private loadControllers(controllers: any[]) {
		controllers.forEach(controller => {
			const controllerInstance = new controller();
			this.controllers.push(controllerInstance);
			this.app.use(
				controllerInstance.getBaseRoute(this.apiPrefix),
				controllerInstance.router
			);
		});
	}

	private setResponseHandlers() {
		this.app.use("*", this.responseHandler.handleResponse());
		this.app.use(this.responseHandler.handleErrorResponse());
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the http://localhost:${this.port}`); //tslint:disable-line
		});
	}
}

export default App;
