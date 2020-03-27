import { ErrorRequestHandler } from "express";

export type CommonErrorHandler = ErrorRequestHandler & {
	status: number;
	message: string;
};
