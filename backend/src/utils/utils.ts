import { Request, Response, NextFunction } from "express";
import { Errors } from "../errors/errors";

export function validateRequiredParams(paramsToValidate: string[]): Function {
	return (req: Request, res: Response, next: NextFunction) => {
		const paramsAreValid = paramsToValidate.every(
			param => req.body[param] || req.params[param] || req.query[param]
		);

		paramsAreValid
			? next()
			: next({
					status: Errors.status.badRequest,
					message: Errors.message.INVALID_PARAMS
			  });
	};
}
