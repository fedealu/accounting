import express, { NextFunction, Response } from "express";

export enum HTTPMethodsAvailable {
	get = "get",
	post = "post"
}

export interface Method {
	type: HTTPMethodsAvailable;
	cb: Function[];
	params?: string[];
	additionalPattern?: string;
}

export class BaseController {
	public router: any;
	public route: string;
	private usePrefix: boolean;

	constructor(route: string, usePrefix = true) {
		this.route = route;
		this.usePrefix = usePrefix;
		this.router = express.Router();
	}

	public getBaseRoute(apiPrefix: string) {
		return this.usePrefix ? `${apiPrefix}/${this.route}` : this.route;
	}

	public registerMethods(methodsToRegister: Method[] | Method) {
		Array.isArray(methodsToRegister)
			? methodsToRegister.forEach(method => this.registerMethod(method))
			: this.registerMethod(methodsToRegister);
	}

	private registerMethod(method: Method) {
		this.router[method.type](
			`${method.params ? "/" + this.parseRouteArgs(method.params) : ""}`,
			...method.cb.map((cb, i, arr) =>
				i === arr.length - 1 ? this.wrapWithResponseHandler(cb) : cb
			)
		);
	}

	private wrapWithResponseHandler(cb: Function) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				await cb(req, res);
				next();
			} catch (err) {
				res.locals.status = err.status;
				res.locals.response = err.message;
				next();
			}
		};
	}

	private parseRouteArgs(params: string[]) {
		return params.map(param => `:${param}`).join("/");
	}
}
